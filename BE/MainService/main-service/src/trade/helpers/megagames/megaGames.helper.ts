/* eslint-disable @typescript-eslint/camelcase */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  END_POINT,
  CHANNELS,
  MEGA_GAMES_URL,
  METHOD,
} from '../../../config/const';
import * as _ from 'lodash';
import { TradeHelper } from '../trade/trade.helper';

// axios.defaults.headers.common['Authorization'] = MIFE_TOKEN;

@Injectable()
export class MegaGamesHelper {
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
      /*const body = {
        client_id: data.client_id,
        client_secret: data.client_secret,
        scope: data.scope,
        Grant_type: data.Grant_type,
      };*/

      /*
      const accessTokenData = await this.applicationHelper.getMifeAccessToken();// request MIFE access token 
      */

      const accessTokenData = {
        access_token:"token_value",       
      }

      if (accessTokenData.access_token) {
        const tokenData = await this.tradeHelper.request( // request mega games token through a GET
          METHOD.GET,
          `${MEGA_GAMES_URL}?msisdn=${connectionReference}`, 
          null,
          { Authorization: `Bearer ${accessTokenData.access_token}` },
        );
        return { redirectUrl: tokenData.data.url, token: tokenData.data.token };
      }     
    } catch (error) {
      throw new HttpException(
        { message: error.message, data },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
