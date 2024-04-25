import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EXPIRATION_DURATION } from '../../src/config/const';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getCache(key:string): Promise<string> {   
      return await this.cache.get(key);    
  }

  async setCache(key, value) {    
    await this.cache.set(key, JSON.stringify(value), { ttl: EXPIRATION_DURATION });
  }
}