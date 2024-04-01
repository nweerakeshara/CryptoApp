import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OTPService } from '../services/otp.service';
import { OTPController } from '../controllers/otp.controller';
import { Common } from '../../config/common/common';
import { BunyanLogger } from '../../logger/bunyan-logger';
import {OTPEntity} from '../entities/otp.entity'
import { UserHelper } from '../../user/helpers/user.helper';

@Module({
  imports: [
    TypeOrmModule.forFeature( 
      [OTPEntity]
    ),    
  ],
  providers: [OTPService, Common, BunyanLogger, UserHelper],
  controllers: [OTPController],
})
export class OTPModule {}