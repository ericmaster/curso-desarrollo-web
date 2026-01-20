const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// Configuración de MongoDB (Usará localhost si no hay variables de entorno)
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'red_social_db';

async function connectDB() {
    await client.connect();
    const db = client.db(dbName);
    return {
        usuarios: db.collection('usuarios'),
        posts: db.collection('posts'),
        client
    };
}

module.exports = { connectDB, ObjectId };