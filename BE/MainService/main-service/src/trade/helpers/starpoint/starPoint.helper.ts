import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  END_POINT,
  CHANNELS,
  MIFE_STG_BASE_URL,
  METHOD,
  SUPPER_APP_REF
} from '../../../config/const';
import * as _ from 'lodash';
import { TradeHelper } from '../trade/trade.helper';

// axios.defaults.headers.common['Authorization'] = MIFE_TOKEN;

@Injectable()
export class StarPointHelper {
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
      
      const body = {
        appId: SUPPER_APP_REF, // appId should come from constant
        connectionReference,
        deviceId,
        channel: CHANNELS.MOBILE,
      };

      const accessTokenData = await this.tradeHelper.getMifeAccessToken();// request MIFE access token 

      if (accessTokenData.status) {
        const tokenData = await this.tradeHelper.request( // request star point token
          METHOD.POST,
          `${MIFE_STG_BASE_URL}${END_POINT.MIFE_AUTH}`,
          body,
          { Authorization: `Bearer ${accessTokenData.data.access_token}` },
        );

        return { redirectUrl: data.url, token: tokenData.data.token };
      }
    } catch (error) {
      throw new HttpException(
        { message: error.message, data },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
