import {
  Controller, UseInterceptors, Post, Body, HttpException, HttpStatus, Get,
} from '@nestjs/common';
import { TradeService } from '../services/trade.service';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { LOG_TYPE, LOG_MSG } from '../../config/const';
import { TradeDTO } from '../dtos/trade.dto';
import { Common } from '../../config/common/common';
import { VALIDATIONS } from '../../config/const';

@UseInterceptors(ErrorInterceptor)
@Controller('trade')
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
    private logger: BunyanLogger,
    private readonly commonHelper: Common
  ) { }

  @Get('/authentication')
  async authenticateApp() {
    console.log("controller")
    if (!this.commonHelper.validateMobileNumber("0773265977")) {
      throw new HttpException(
        VALIDATIONS.INVALID_MOBILE,
        HttpStatus.UNAUTHORIZED,
      );

    } else if (!this.commonHelper.validateApplicationDto("tradeDTO.appId", "tradeDTO.deviceId")) {
      throw new HttpException(
        VALIDATIONS.INVALID_PARAMS,
        HttpStatus.UNAUTHORIZED,
      );

    } else {
      console.log("IN IN controller")
      const AppData = await this.tradeService.authenticateMiniApp();
      this.logger.info({
        type: `${LOG_TYPE.AUTHENTICATION_REQ}`,
        msg: LOG_MSG.AUTH_MINI_APP,
        appId: "tradeDTO.appId",
        response: AppData.data,
      });
      return AppData;
    }
  }
}
