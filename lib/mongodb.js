import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) {
//   console.log(typeof MONGODB_URI);
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const dbInitConnect = async () => {
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
    cached.conn = await cached.promise;
  }
};

const dbConnect = (handler) => async (req, res) => {
  if (cached.conn) {
    return handler(req, res);
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return handler(req, res);
};

export default dbConnect;
