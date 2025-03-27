import { redis } from '../lib/redis';

export class CacheService {
  static async get<T = any>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  }

  static async set(key: string, value: any, expireInSec = 60): Promise<void> {
    await redis.set(key, JSON.stringify(value), 'EX', expireInSec);
  }

  static async del(key: string): Promise<void> {
    await redis.del(key);
  }
}