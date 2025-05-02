// lib/mongoose.ts
import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // allow us to attach the cache to the global object in Node.js
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache;
}

const cache: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cache;
}

export async function connect(): Promise<typeof mongoose> {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    const opts = {
      bufferCommands: false as const,
      useNewUrlParser: true as const,
      useUnifiedTopology: true as const,
    };
    cache.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then(m => m);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
