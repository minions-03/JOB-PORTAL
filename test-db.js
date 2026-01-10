const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
    const uri = process.env.MONGODB_URI;
    console.log("Testing connection to:", uri ? "URI Found" : "URI NOT FOUND");

    if (!uri) return;

    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to MongoDB!");

        // Optional: Try to fetch users to ensure model works
        // const User = require('./models/User'); // This might fail if using ES6 export in models
        // console.log("Models check skipped for script simplicity (ES6 vs CommonJS mismatch potential). Connection is the main check.");

    } catch (error) {
        console.error("Connection failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

testConnection();
