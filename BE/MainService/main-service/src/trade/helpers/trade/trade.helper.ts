import { HttpException, Injectable } from '@nestjs/common';

import * as qs from 'qs';
import axios from 'axios';
import { END_POINT, MIFE_BASIC_TOKEN, MIFE_REQUEST, MIFE_STG_BASE_URL } from '../../../config/const';

@Injectable()
export class TradeHelper {

  async request(method:any,url:any,data:any,headers:any){
    try {
      const response = await axios({
        method,
        url,
        ...(data && { data }),
        ...(headers && {headers})
    })
    return response;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getMifeAccessToken(){
    const config = {
      headers: {
        Authorization: `Basic ${MIFE_BASIC_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    try {
      const reqBody = qs.stringify(MIFE_REQUEST.AUTH_BODY);
      const accessTokenData = await axios.post(
        `${MIFE_STG_BASE_URL}${END_POINT.MIFE_TOKEN}`, reqBody,config);
      return accessTokenData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }   
  }

  
    
}
