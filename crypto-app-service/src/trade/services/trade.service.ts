import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradeResponse } from '../dtos/trade.response.dto';
import { TradeDTO } from '../dtos/trade.dto';
import { STRING, LOG_TYPE, LOG_MSG, VALIDATIONS } from '../../config/const';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { TradeEntity } from '../entities/trade.entity';
import { Repository } from 'typeorm';
import { Common } from '../../config/common/common';

import {
  END_POINT,
  CHANNELS,
  MIFE_STG_BASE_URL,
  METHOD,
  SUPPER_APP_REF
} from '../../config/const'
import { TradeHelper } from '../helpers/trade/trade.helper';
//import { RedisCacheService } from '../../cache/redisCache.service';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(TradeEntity)
    private tradeRepository: Repository<TradeEntity>,
    private commonHelper: Common,   
    //private redisCacheService: RedisCacheService,
    private logger: BunyanLogger,
    private tradeHelper: TradeHelper
  ) {}

  async authenticateMiniApp(
    
  ): Promise<TradeResponse> {
    try {   
      console.log("SERVICE")
      const baseObj = {
        page : 1,
        rows: 20,
        publisherType: null,
        asset : 'USDT',
        tradeType : "BUY",
        fiat: "ARS",
        payTypes: []
      };

      const stringData = JSON.stringify(baseObj);
      console.log("SERVICE--")
      const tokenData = await this.tradeHelper.request( // request star point token
          METHOD.POST,
          `p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search`,
          stringData,
          { "Content-Type": "application/json",
          "Content-Length": stringData.length, },
        );

      console.log(tokenData)  
      return new TradeResponse(
        HttpStatus.OK,
        STRING.SUCCESS,
        `${STRING.AUTH} ${STRING.SUCCESS}`,
        tokenData,
      );
    } catch (error) {
      this.logger.error({
        data:null,
        type: `${LOG_TYPE.AUTHENTICATION_REQ}_${STRING.ERROR.toLowerCase()}`,
        msg: LOG_MSG.AUTH_MINI_APP,
        error: error.message,
      });
      throw new HttpException(error.message, error.status);
    }
  }
}
