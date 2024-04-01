import { Test, TestingModule } from '@nestjs/testing';
import { OTPService } from './otp.service';
import { OTPEntity } from '../entities/otp.entity';
import { OTPResponse } from '../dtos/otp.response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { HttpStatus } from '@nestjs/common';
import { FREEZONE_BONUS, STRING, VALIDATIONS } from '../../config/const';
import { OTPRequestDTO } from '../dtos/otpRequest.dto';
import { UserHelper } from '../../user/helpers/user.helper';
import { Common } from '../../config/common/common';
import axios, { AxiosResponse } from 'axios';

let otpEntity = new OTPEntity();
otpEntity.id = 1;
otpEntity.msisdn = '0777231234';
otpEntity.email = 'smith@gmail.com';
otpEntity.otpValue = '5456';
otpEntity.retryCount = 1;
otpEntity.createdAt = new Date('CURRENT_TIMESTAMP()');

let mockupdateData = { generatedMaps: [], raw: [], affected: 1 };

export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => otpEntity),
  find: jest.fn(() => otpEntity),
  findOne: jest.fn(() => otpEntity),
  update: jest.fn(() => otpEntity),
  // createQueryBuilder: jest.fn(() => ({     
  //   where: jest.fn(() => otpEntity),
  //   andWhere: jest.fn(() => otpEntity),
  //   orderBy: jest.fn(() => otpEntity),
  //   getOne: jest.fn(() => otpEntity),
  //   execute: jest.fn(() => otpEntity),
  //   })),
}));

describe('Test OTP Service', () => {
  let otpService: OTPService;
  let otpRepository: Repository<OTPEntity>;
  let userHelper: UserHelper;
  let commonHelper: Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OTPService,
        OTPEntity,        
        Common,
        {
          provide: getRepositoryToken(OTPEntity),
          useClass: registeredApplicationRepositoryMockFactory,
        },       
        BunyanLogger,
        UserHelper,
      ],     
    }).compile();

    otpService = module.get<OTPService>(OTPService);
    otpRepository = module.get<Repository<OTPEntity>>(
      getRepositoryToken(OTPEntity),
    );
    userHelper = module.get<UserHelper>(UserHelper);   
    commonHelper = module.get<Common>(Common);    
  });

  it('otpService should be defined', () => {
    expect(otpService).toBeDefined();
  });

  it('otpRepository should be defined', () => {
    expect(otpRepository).toBeDefined();
  });

  it('createOTP should return success response ', async () => {
    const expected: any = {
      msisdn: otpEntity.msisdn,      
      email: otpEntity.email,      
    };
    const mockSuccessResponse = new OTPResponse(
      HttpStatus.CREATED,
      STRING.SUCCESS,
      `${STRING.OTP} ${STRING.CREATE} ${STRING.SUCCESS}`,
      expected,
    );

    
    jest.spyOn(otpRepository, 'findOne').mockReturnValueOnce(undefined);
    jest.spyOn(otpRepository, 'save').mockResolvedValueOnce(otpEntity);
    expect(await otpService.createOTP(expected)).toEqual(mockSuccessResponse);
  });

  it('createOTP within time interval', async () => {
    const expected: any = { createdAt: new Date() };
    try {
      jest.spyOn(otpRepository, 'findOne').mockResolvedValueOnce(expected);
      await otpService.createOTP(otpEntity);
    } catch (error) {
      expect(error.message).toBe(
        `${VALIDATIONS.OTP_RETRY_WAIT}: ${(STRING.OTP_RETRY_INTERVAL).toFixed(0)} ${STRING.SECONDS}`,
      );
    }
  });

 
});
