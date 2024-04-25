import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationService } from './application.service';
import { ApplicationEntity } from '../entities/application.entity';
import { ApplicationResponse } from '../dtos/application.response.dto';
import { ApplicationDTO } from '../dtos/application.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { HttpException, HttpStatus, CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { STRING, VALIDATIONS } from '../../config/const';
import { Common } from '../../config/common/common';
import { StarPointHelper } from '../helpers/starpoint/starPoint.helper';
import { ApplicationHelper } from '../helpers/application/application.helper';
import { FreeZoneHelper } from '../helpers/freezone/freeZone.helper';
import { MegaGamesHelper } from '../helpers/megagames/megaGames.helper';
import { VIUHelper} from '../helpers/viu/viu.helper';
import { DeviceSalesHelper } from '../helpers/deviceSales/deviceSales.helper';
import { RedisCacheService } from '../../cache/redisCache.service';
import { Cache } from 'cache-manager';

let applicationEntity = new ApplicationEntity();
applicationEntity.id = 1;
applicationEntity.appId  = "SUPER_APP";
applicationEntity.appName = "Star Point";
applicationEntity.url = 'https://www.google.com';

let applicationDto = new ApplicationDTO();
applicationDto.appId ="SUPER_APP"
applicationDto.msisdn = "07788234352"

const mockReturnUrl = {redirectUrl:"https://www.google.com",token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"}

export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn(() => applicationEntity),
}));

describe('Test Application Service', () => {
  let applicationService: ApplicationService;
  let applicationRepository: Repository<ApplicationEntity>;
  let applicationHelper : ApplicationHelper;
  let starpointHelper : StarPointHelper;
  let megagamesHelper : MegaGamesHelper;
  let redisCacheService: RedisCacheService;
  let cache: Cache;
  let viuHelper : VIUHelper;
  let devicesalesHelper : DeviceSalesHelper;
  let commonHelper : Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationService,
        ApplicationEntity,
        Common,
        StarPointHelper,
        FreeZoneHelper,
        ApplicationHelper,
        MegaGamesHelper,
        VIUHelper,
        DeviceSalesHelper,
        RedisCacheService,
        {
          provide: getRepositoryToken(ApplicationEntity),
          useClass: registeredApplicationRepositoryMockFactory,
        },
        BunyanLogger,
      ],
      imports: [CacheModule.register({})],
    }).compile();
    applicationService = module.get<ApplicationService>(ApplicationService);
    applicationRepository = module.get<Repository<ApplicationEntity>>(
      getRepositoryToken(ApplicationEntity),
    );
    commonHelper = module.get<Common>(Common);
    starpointHelper = module.get<StarPointHelper>(StarPointHelper);
    megagamesHelper = module.get<MegaGamesHelper>(MegaGamesHelper);
    viuHelper = module.get<VIUHelper>(VIUHelper);
    devicesalesHelper = module.get<DeviceSalesHelper>(DeviceSalesHelper);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);
    applicationHelper = module.get<ApplicationHelper>(ApplicationHelper);
    cache = module.get<any>(CACHE_MANAGER);
  });

  it('applicationService should be defined', () => {
    expect(applicationService).toBeDefined();
  });

  it('applicationRepository should be defined', () => {
    expect(applicationRepository).toBeDefined();
  });

  it('starpointHelper should be defined', () => {
    expect(starpointHelper).toBeDefined();
  });

  it('megagamesHelper should be defined', () => {
    expect(megagamesHelper).toBeDefined();
  });

  it('redisService should be defined', () => {
    expect(redisCacheService).toBeDefined();
  });

  it('commonHelper should be defined', () => {
    expect(commonHelper).toBeDefined();
  });
 
  it('authenticateMiniApp should return success response ', async () => {
    const expected: any = {  
      appId : applicationEntity.appId,
      appName : applicationEntity.appName,
      url : applicationEntity.url      
    }  
    const mockSuccessResponse = new ApplicationResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.AUTH} ${STRING.SUCCESS}`,
      mockReturnUrl,
    );
    jest.spyOn(applicationRepository, 'findOne').mockResolvedValueOnce(expected);
    jest.spyOn(redisCacheService, 'getCache').mockResolvedValueOnce(null);
    jest.spyOn(commonHelper, 'formatHelperName').mockResolvedValueOnce(applicationEntity.appName.replace(/\s+/g, '').toLowerCase());
    jest.spyOn(starpointHelper, 'checkOperation').mockResolvedValueOnce(mockReturnUrl);
    expect(await applicationService.authenticateMiniApp(applicationDto)).toEqual(
      mockSuccessResponse,
    );
  });

  it('Should throw Application not exist ', async () => {       
    try {
      jest.spyOn(applicationRepository, 'findOne').mockResolvedValueOnce(undefined);
      await applicationService.authenticateMiniApp(applicationDto);
    } catch (error) {
      expect(error.message).toBe(`${VALIDATIONS.APP_NOT_EXIST} ${applicationEntity.appId}`);
    }    
  });

  it('authenticateMiniApp should return success response with data from Redis', async () => {
    const expected: any = {  
      appId : applicationEntity.appId,
      appName : applicationEntity.appName,
      url : applicationEntity.url      
    }  
    const mockSuccessResponse = new ApplicationResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.AUTH} ${STRING.SUCCESS}`,
      mockReturnUrl,
    );
    jest.spyOn(applicationRepository, 'findOne').mockResolvedValueOnce(expected);
    jest.spyOn(redisCacheService, 'getCache').mockResolvedValueOnce(JSON.stringify(mockReturnUrl));    
    expect(await applicationService.authenticateMiniApp(applicationDto)).toEqual(
      mockSuccessResponse,
    );
  });

 
});
