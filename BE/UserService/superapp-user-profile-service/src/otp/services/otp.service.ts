import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { OTPResponse } from '../dtos/otp.response.dto';
import { OTPRequestDTO } from '../dtos/otpRequest.dto';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { OTPEntity } from '../entities/otp.entity';
import { Repository, getRepository } from 'typeorm';
import {
  STRING,
  LOG_TYPE,
  LOG_MSG,
  VALIDATIONS,
  END_POINT,
  MIFE_STG_BASE_URL,
  METHOD,
} from '../../config/const';
import { Common } from '../../config/common/common';

@Injectable()
export class OTPService {
  constructor(
    @InjectRepository(OTPEntity)
    private otpRepository: Repository<OTPEntity>,
    private logger: BunyanLogger,
    private commonHelper: Common,
  ) { }

  async createOTP(otpDto: OTPRequestDTO): Promise<OTPResponse> {
    const { msisdn, email } = otpDto;
    try {
      let timeSpent = STRING.OTP_RETRY_INTERVAL + 1;

      const OTPData = await this.otpRepository.findOne({
        where: { msisdn: msisdn, email: email },
        order: { createdAt: 'DESC' }
      });

      if (OTPData) {       
        timeSpent = await this.commonHelper.getTimeDifference(OTPData.createdAt);
      }

      if (timeSpent > STRING.OTP_RETRY_INTERVAL) {
        const OTPValue = await this.commonHelper.getRandomOTP();
        const OTPRecord = new OTPEntity();
        OTPRecord.msisdn = msisdn;
        OTPRecord.email = email;
        OTPRecord.otpValue = String(OTPValue);
        OTPRecord.retryCount = 0;

        await this.otpRepository.save(OTPRecord);

        // const accessTokenData = await this.userHelper.getMifeAccessToken(); // request MIFE access token
        const accessTokenData = {
          status: true
        } //remove when uncommenting above

        if (accessTokenData.status) {
          // const response = await this.userHelper.request(            
          //   METHOD.POST,
          //   `${MIFE_STG_BASE_URL}${END_POINT.NOTIFICATION_SERVICE_SEND_OTP}`,
          //   OTPRecord,
          //   { Authorization: `Bearer ${accessTokenData.data.access_token}` },
          // );

          const response = {
            status: true
          } //remove when uncommenting above

          if (response.status) {
            return new OTPResponse(
              HttpStatus.CREATED,
              STRING.SUCCESS,
              `${STRING.OTP} ${STRING.CREATE} ${STRING.SUCCESS}`,
              otpDto,
            );
          } else {
            throw new HttpException(STRING.FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      } else {
        throw new HttpException(
          { message: `${VALIDATIONS.OTP_RETRY_WAIT}: ${(STRING.OTP_RETRY_INTERVAL - timeSpent).toFixed(0)} ${STRING.SECONDS}` },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      this.logger.error({
        msisdn,
        data: { msisdn },
        type: `${LOG_TYPE.LOGIN_ERROR}`,
        msg: LOG_MSG.VERIFY_MOBILE,
        error: error.message,
      });
      throw new HttpException(error.message, error.status);
    }
  }
}
