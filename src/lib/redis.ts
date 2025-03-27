import Redis from 'ioredis';

// Cria e exporta uma instância do Redis conectando na porta padrão local
export const redis = new Redis({
  host: 'localhost',
  port: 6379,
});