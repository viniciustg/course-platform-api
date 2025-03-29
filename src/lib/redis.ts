import Redis from 'ioredis';

const isTest = process.env.NODE_ENV === 'test';

export const redis = isTest
  ? {
      get: async () => null,
      set: async () => null,
      del: async () => null
    } // mocka as funções
  : new Redis({
      host: 'localhost',
      port: 6379,
      maxRetriesPerRequest: 5,
    });