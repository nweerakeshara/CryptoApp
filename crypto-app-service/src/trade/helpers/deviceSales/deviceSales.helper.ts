import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { TradeHelper } from '../trade/trade.helper';

// axios.defaults.headers.common['Authorization'] = MIFE_TOKEN;

@Injectable()
export class DeviceSalesHelper {
  constructor(private tradeHelper: TradeHelper) {}

  async checkOperation(
    data: any,
    connectionReference: string,
    deviceId: string,
  ) {
    try {
      return this.authenticateApp(data, connectionReference, deviceId);
    } catch (error) {
      throw new HttpException(
        { message: error.message, data },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async authenticateApp(
    data: any,
    connectionReference: string,
    deviceId: string,
  ) {
    try {
        return { redirectUrl: data.url, token: ""};
      
    } catch (error) {
      throw new HttpException(
        { message: error.message, data },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}