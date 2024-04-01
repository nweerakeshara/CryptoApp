import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  HttpException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async getCache(key: string): Promise<string> {
    return await this.cache.get(key);
  }

  async setCache(key, value) {
    try {
      console.log('--**cache key-->', key);
      console.log('--**cache value-->', value);
      return await this.cache.set(key, value);
    } catch (error) {
      console.log('setCache error-->', error);
      throw new HttpException(error.message, error.status);
    }
  }

  async removeCache(key) {
    await this.cache.del(key);
  }
}
