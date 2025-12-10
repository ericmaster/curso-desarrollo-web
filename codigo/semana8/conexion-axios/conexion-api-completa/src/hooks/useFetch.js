import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiClient = axios.create({
    baseURL: 'https://jubilant-zebra-wxvqvvrjw2gjwr-5173.app.github.dev',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiClient.get(path);
        setData(result.data);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (path) {
      fetchData();
    }
  }, [path]);

  return { data, loading, error };
};