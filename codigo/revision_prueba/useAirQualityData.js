// src/hooks/useAirQualityData.js
import { useState, useEffect } from 'react';

// Constantes de configuración (mejoran mantenibilidad)
const API_URL = 'http://api.airelimpio.ec/v1/measurements'; // o 'https://api.airelimpio.ec/v1/measurements'
const CACHE_KEY = 'airQualityCache'; // en general, cualquier clave única
const CACHE_DURATION_MS = 600000; // 10 * 60 * 1000 o 10 minutos en milisegundos
const MAX_RETRIES = 2;
const INITIAL_DELAY_MS = 1000; // 1 segundo
const FETCH_TIMEOUT_MS = 5000; // 5 segundos

/**
 * Custom hook para consumir datos de calidad del aire de una API externa.
 * 
 * Estados devueltos:
 * - data: datos válidos (o null)
 * - loading: booleano
 * - error: mensaje de error (o null)
 */
export const useAirQualityData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Función recursiva para intentar obtener datos con reintentos.
   * Podria definirse fuera del hook, pero se deja aquí por simplicidad.
   * Usa retroceso exponencial: 1s → 2s → 4s...
   */
  const fetchDataWithRetry = async (retries = MAX_RETRIES, delay = INITIAL_DELAY_MS) => {
    const controller = new AbortController();
    let timeoutId;

    try {
      // Configura un timeout para evitar bloqueos
      timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

      // Realiza la solicitud con señal de aborto
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });

      // Limpia el timeout si la solicitud termina a tiempo
      clearTimeout(timeoutId);

      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const jsonData = await response.json();

      // Validación de la estructura esperada (previene fallos por cambios en la API)
      if (!Array.isArray(jsonData.measurements)) {
        throw new Error('La respuesta no contiene un arreglo "measurements" válido');
      }

      return jsonData;
    } catch (error) {
      // Si fue abortado por timeout, lo tratamos como error de red
      if (error.name === 'AbortError') {
        throw new Error('Tiempo de espera agotado al conectar con el servidor');
      }

      // Si quedan reintentos, esperamos y volvemos a intentar
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchDataWithRetry(retries - 1, delay * 2); // Retroceso exponencial
      }

      // Si no hay más reintentos, lanzamos el error final
      throw error;
    } finally {
      // Asegura limpieza del timeout incluso si hay error
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  /**
   * Función principal que orquesta la carga de datos (caché + API)
   */
  const loadData = async () => {
    setLoading(true);
    setError(null);

    // 1. Verificar si hay caché válido
    let cachedData = null;
    const cachedStr = localStorage.getItem(CACHE_KEY);
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        if (Date.now() - cached.timestamp < CACHE_DURATION_MS) {
          cachedData = cached.data;
          setData(cachedData);
          setLoading(false);

          // ✨ Estrategia: actualizar en segundo plano (stale-while-revalidate)
          fetchDataWithRetry()
            .then(freshData => {
              setData(freshData);
              // Guardar nuevo caché
              localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: freshData,
                timestamp: Date.now()
              }));
            })
            .catch(() => {
              // Si falla la actualización, mantenemos el caché
            });
          return;
        }
      } catch (e) {
        // Si el caché está corrupto, lo ignoramos
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // 2. Cargar desde la API (no hay caché válido)
    try {
      const freshData = await fetchDataWithRetry();
      setData(freshData);
      // Guardar en caché
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: freshData,
        timestamp: Date.now()
      }));
    } catch (err) {
      setError(err.message || 'Error desconocido al cargar datos ambientales');

      // 3. Fallback: usar caché expirado si existe
      if (cachedData) {
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    loadData();
  }, []); // Solo al montar

  return { data, loading, error };
};