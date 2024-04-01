import { Test, TestingModule } from '@nestjs/testing';
import { TradeController } from './trade.controller';
import { TradeService } from '../services/trade.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TradeEntity } from '../entities/trade.entity';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { TradeResponse } from '../dtos/trade.response.dto';
import { CacheModule, CACHE_MANAGER, HttpStatus } from '@nestjs/common';
import { STRING } from '../../config/const';
import { Common } from '../../config/common/common';
import { StarPointHelper } from '../helpers/starpoint/starPoint.helper';
import { TradeHelper } from '../helpers/trade/trade.helper';
import { FreeZoneHelper } from '../helpers/freezone/freeZone.helper';
import { VIUHelper} from '../helpers/viu/viu.helper';
import { MegaGamesHelper } from '../helpers/megagames/megaGames.helper';
import { DeviceSalesHelper } from '../helpers/deviceSales/deviceSales.helper';
import { RedisCacheService } from '../../cache/redisCache.service';
import { VALIDATIONS } from '../../config/const';

const mockApp = {
  appId : "SUPER_APP",
  msisdn: "07788234352",
  deviceId : "1234"
};
describe('Application  Controller', () => {
  let tradeController: TradeController;
  let tradeService: TradeService;
  let redisCacheService:RedisCacheService;
  let cacheManager: any;
  let commonHelper: Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeController],
      providers: [
        TradeService,
        StarPointHelper,
        FreeZoneHelper,
        VIUHelper,
        TradeHelper,
        MegaGamesHelper,   
        DeviceSalesHelper,     
        RedisCacheService,
        Common,
        {
          provide: getRepositoryToken(TradeEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(mockApp),
            find: jest.fn().mockResolvedValue([mockApp]),
          },
        },
        BunyanLogger,
      ],
      imports: [CacheModule.register({})]
    }).compile();

    tradeController = module.get<TradeController>(TradeController);
    tradeService = module.get<TradeService>(TradeService);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);    
    cacheManager = module.get<any>(CACHE_MANAGER);
    commonHelper = module.get<Common>(Common);
  });

  it('Application Controller should be define', () => {
    expect(tradeController).toBeDefined();
  });

  it('Application Service should be define', () => {
    expect(tradeService).toBeDefined();
  });

  it('should have a authenticateApp function', () => {
    expect(typeof tradeController.authenticateApp).toBe('function');
  });

  it('Test Mini App Authentication', async () => {
    const mockSuccessResponse = new TradeResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.AUTH} ${STRING.SUCCESS}`,
      mockApp,
    ); 
    jest.spyOn(commonHelper, 'validateApplicationDto').mockReturnValueOnce(true);
    jest.spyOn(commonHelper, 'validateMobileNumber').mockReturnValueOnce(true);
    jest.spyOn(tradeService, 'authenticateMiniApp').mockResolvedValueOnce(mockSuccessResponse);
    expect(await tradeController.authenticateApp(mockApp)).toBe(mockSuccessResponse);
  });

  it('validate Mini App Authentication with invalid msisdn', async () => {
    try {
      jest.spyOn(commonHelper, 'validateApplicationDto').mockReturnValueOnce(true);
      jest.spyOn(commonHelper, 'validateMobileNumber').mockReturnValueOnce(false);
      await tradeController.authenticateApp(mockApp)
    } catch (error) {
      expect(error.message).toBe(VALIDATIONS.INVALID_MOBILE);
    }
  });

  it('validate Mini App Authentication with invalid body parameter', async () => {
    try {
      jest.spyOn(commonHelper, 'validateApplicationDto').mockReturnValueOnce(false);
      jest.spyOn(commonHelper, 'validateMobileNumber').mockReturnValueOnce(true);
      await tradeController.authenticateApp(mockApp)
    } catch (error) {
      expect(error.message).toBe(VALIDATIONS.INVALID_PARAMS);
    }
  });
});
