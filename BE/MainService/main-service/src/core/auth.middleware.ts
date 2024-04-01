import {HttpException, HttpStatus, Injectable,NestMiddleware} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Common } from '../config/common/common';
import { VALIDATIONS } from '../config/const';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly commonHelper: Common) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const msisdn = req.body.msisdn || req.params[0];
    if (this.commonHelper.validateMobileNumber(msisdn)) {
      next();
    } else {
      throw new HttpException(
        VALIDATIONS.INVALID_MOBILE,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
