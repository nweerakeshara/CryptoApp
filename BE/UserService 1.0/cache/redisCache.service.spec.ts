import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisCacheService } from './redisCache.service';

const mockCachedata = {
  at_hash: 'OWIwMTVhM2QtODgyMC0zY2I4LTljN2ItOGJiYmM3YzU2NDYx',
  sub: '7fab42fa-324e-4a9d-b52c-2c7b848a7018',
  aud: ['Xmpkqdz_B0QJEPhfBcRYSA7Ts6Ya'],
  first_name: 'janitha',
  iss: 'https://localhost:9443/oauth2/token',
  last_name: 'lokuge',
  exp: 1600844075081,
  nonce: 'nounce1222',
  Mobile: '76234947623478707870',
  iat: 1600840475081,
  username: '94762347870',
};
const cacheKey = '94762347870';
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

  it('Remove all cache successfully', async () => {
    jest.spyOn(cacheManager, 'del');
    await redisCacheService.removeCache(cacheKey);
  });
});
