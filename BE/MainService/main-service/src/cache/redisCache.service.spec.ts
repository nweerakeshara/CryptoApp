import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './redisCache.service';

const mockCachedata = {redirectUrl:"https://www.google.com",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}
const cacheKey = '94762347870MegaWasana5';
describe('RedisCacheService', () => {
  let redisCacheService: RedisCacheService;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisCacheService],
      imports: [CacheModule.register({})],
    }).compile();

    redisCacheService = module.get<RedisCacheService>(RedisCacheService);
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  it('RedisCacheService should be defined', () => {
    expect(redisCacheService).toBeDefined();
  });

  it('Get cache successfully', async () => {
    jest.spyOn(cacheManager, 'get').mockResolvedValueOnce(mockCachedata);
    expect(await redisCacheService.getCache(cacheKey)).toBe(mockCachedata);
  });
  it('Set cache successfully', async () => {
    jest.spyOn(cacheManager, 'set');
    await redisCacheService.setCache(cacheKey,mockCachedata);
  });
  
});
