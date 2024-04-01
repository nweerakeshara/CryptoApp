import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as moment from 'moment';
import { VALIDATIONS, PRIVATE_KEY, PUBLIC_KEY, OTP_GENERATION } from '../const';
import { HttpException, HttpStatus } from '@nestjs/common';
import { URLSearchParams } from 'url';

export class Common {
  convertToInternationalMobile(mobile: string) {
    return `${VALIDATIONS.SL_COUNTRY_CODE}${mobile.substring(
      mobile.length - 9,
      mobile.length,
    )}`;
  }
  convertToLocalMobile(mobile: string) {
    return `0${mobile.substring(mobile.length - 9, mobile.length)}`;
  }

  generateURLParam(params) {
    return new URLSearchParams(params).toString();
  }

  validateMobileNumber(value) {
    const status = true;
    const mob = /^((947)(0|1|2|4|5|6|7|8)[0-9]{7})$/;
    if (!value) {
      return !status;
    }
    const mobile = this.convertToInternationalMobile(value);
    const splitMob = mobile.split('+');

    if (!mob.test(splitMob[1])) {
      return !status;
    } else {
      return status;
    }
  }
  formatMobile(msisdn: string) {
    const mobile = this.convertToLocalMobile(msisdn);
    console.log('mobile-->', mobile);
    // const splitMob = mobile.split('+');
    return mobile;
  }

  futureDateFormat(days) {
    return moment().add(Number(days), 'd');
  }
  signToken(payload: any) {
    try {
      const privateKey = fs.readFileSync(PRIVATE_KEY, 'utf8');
      return jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  verifyToken(token: string) {
    try {
      const publicKey = fs.readFileSync(PUBLIC_KEY, 'utf8');
      return jwt.verify(token, publicKey, { algorithm: 'RS256' });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  getTimeDifference(createdAt: Date) {
    const previousOTPDateTime = new Date(createdAt).getTime() / 1000;
    const newOTPDateTime = new Date().getTime() / 1000;
    return newOTPDateTime - previousOTPDateTime;
  }

  getRandomOTP() {    
    return Math.floor(OTP_GENERATION.NumberOne + Math.random() * OTP_GENERATION.NumberTwo);
  }
}
