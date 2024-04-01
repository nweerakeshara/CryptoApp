import {
  Controller, 
  UseInterceptors,
  Post,
  Body, 
} from '@nestjs/common';
import { OTPService } from '../services/otp.service';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { LOG_TYPE, LOG_MSG } from '../../config/const';
import { OTPRequestDTO } from '../dtos/otpRequest.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('otp')
export class OTPController {
  constructor(
    private readonly otpService: OTPService,
    private logger: BunyanLogger,
  ) {}

  @Post('/send')
  async createOTP(@Body() otpDto: OTPRequestDTO) {
    const otpData = await this.otpService.createOTP(otpDto);

    this.logger.info({
      type: `${LOG_TYPE.OTP_REQUEST}`,
      msg: LOG_MSG.OPT_GENERATION_SUCCESS,
      msisdn: otpDto.msisdn,
      response: otpData.data,
    });
    return otpData;
  }
  
}
