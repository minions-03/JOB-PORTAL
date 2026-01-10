import mongoose from 'mongoose';

// HARDCODED FOR DEBUGGING - The env file is not loading correctly on this machine.
const MONGODB_URI = "mongodb+srv://Mukesh_job_portal:Muk1240gmail@jobportal.h7azgrv.mongodb.net/?appName=JobPortal";
const NEXTAUTH_SECRET = "supersecretkey123";
// We must fix the root cause or hardcode everywhere. Let's fix DB first.


// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   );
// }

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined.");
  console.error("Current Environment Variables Keys:", Object.keys(process.env).filter(k => k.includes('MONGO') || k.includes('NEXT')));
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("MONGODB_URI:", MONGODB_URI);

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
