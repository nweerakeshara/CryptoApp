import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  END_POINT,
  CHANNELS,
  MIFE_STG_BASE_URL,
  METHOD,
} from '../../../config/const';
import * as _ from 'lodash';
import { TradeHelper } from '../trade/trade.helper';
import { type } from 'os';

// axios.defaults.headers.common['Authorization'] = MIFE_TOKEN;

@Injectable()
export class FreeZoneHelper {
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
        msisdn:data.msidsn,
    //    tags:{
    //      "name":data.tags.name,
    //      "email":data.tags.email,
        
    //   },

      };

      const accessTokenData = await this.tradeHelper.getMifeAccessToken();// request MIFE access token 

      if (accessTokenData.status) {
       
        // const tokenData = await this.applicationHelper.request( // request star point token
        //   METHOD.POST,  
        //   `${MIFE_STG_BASE_URL}${END_POINT.MIFE_AUTH}`,
        //   body,
        //   { Authorization: `Bearer ${accessTokenData.data.access_token}`,
        //     channel: CHANNELS.MOBILE,
        //     timestamp:data.createdAt,
        //     requestId:uniqueId
            
        //  },
        // );

        const tokenData = {
           data:{
            "data":"https://dynamicurl/token",
            "expiry":3600,
            "type":1,
            "refresh":"na"
         }
        }
       

        return { url:  tokenData.data.data,};
      }
    } catch (error) {   
      throw new HttpException(
        { message: error.message, data },
        error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
