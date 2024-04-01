import { Test, TestingModule } from '@nestjs/testing';
import { OTPController } from './otp.controller';
import { OTPService } from '../services/otp.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OTPEntity } from '../entities/otp.entity';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { OTPResponse } from '../dtos/otp.response.dto';
import { CacheModule, HttpStatus } from '@nestjs/common';
import { STRING } from '../../config/const';
import { UserHelper } from '../../user/helpers/user.helper';
import { Common } from '../../config/common/common';
import { OTPRequestDTO } from '../dtos/otpRequest.dto';


const mockOTP = {  
  msisdn: '0772121324',  
  email: 'smith@gmail.com'  
};

describe('User Controller', () => {
  let otpController: OTPController;
  let otpService: OTPService; 
  let commonHelper : Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OTPController],
      providers: [
        OTPService,      
        Common,
        {
          provide: getRepositoryToken(OTPEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(mockOTP),
            find: jest.fn().mockResolvedValue([mockOTP]),
          },
        },
        BunyanLogger,
        UserHelper
      ],
      imports: [CacheModule.register({})]
    }).compile();

    otpController = module.get<OTPController>(OTPController);
    otpService = module.get<OTPService>(OTPService);
    commonHelper = module.get<Common>(Common);
  });

  it('otpController should be define', () => {
    expect(otpController).toBeDefined();
  });

  it('otpService should be define', () => {
    expect(otpService).toBeDefined();
  }); 

  it('Test createOTP', async () => {
    const mockSuccessResponse = new OTPResponse(
      HttpStatus.CREATED,
      STRING.SUCCESS,
      STRING.SUCCESS,
      mockOTP,
    );
    jest.spyOn(otpService, 'createOTP').mockResolvedValueOnce(mockSuccessResponse);
    expect(await otpController.createOTP(mockOTP)).toBe(mockSuccessResponse);
  });
});

