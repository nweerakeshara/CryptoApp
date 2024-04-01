import { Test, TestingModule } from '@nestjs/testing';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { UserResponse } from '../dtos/user.response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BunyanLogger } from '../../logger/bunyan-logger';
import {
  CacheModule,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FREEZONE_BONUS, STRING, VALIDATIONS } from '../../config/const';
import { UserUpdateDTO } from '../dtos/user.update.dto';
import { AuthResponse } from '../dtos/auth.response.dto';
import { UserMobileDTO } from '../dtos/user.mobile.dto';
import { UserHelper } from '../helpers/user.helper';
import { RedisCacheService } from '../../cache/redisCache.service';
import { Common } from '../../config/common/common';
import { Cache } from 'cache-manager';
import axios, { AxiosResponse } from 'axios';

let userEntity = new UserEntity();
userEntity.id = 1;
userEntity.msisdn = '0777231234';
userEntity.uniqueUserIdentifier = 2003454;
userEntity.firstName = 'John';
userEntity.lastName = 'Smith';
userEntity.email = 'smith@gmail.com';
userEntity.defaultLanguage = 'english';
userEntity.createdAt = new Date('CURRENT_TIMESTAMP()');
userEntity.updatedAt = new Date('CURRENT_TIMESTAMP()');

let mockupdateData = { generatedMaps: [], raw: [], affected: 1 };
const mockAuthBody = { authCode: 'c79da50f-4eb1', platform: 'MOBILE' };
const mockAuthdata = {
  at_hash: 'OWIwMTVhM2QtODgyMC0zY2I4LTljN2ItOGJiYmM3YzU2NDYx',
  sub: '7fab42fa-324e-4a9d-b52c-2c7b848a7018',
  aud: ['Xmpkqdz_B0QJEPhfBcRYSA7Ts6Ya'],
  first_name: 'janitha',
  iss: 'https://localhost:9443/oauth2/token',
  last_name: 'lokuge',
  exp: 1600844075081,
  nonce: 'nounce1222',
  Mobile: '762347870',
  iat: 1600840475081,
  username: '762347870',
};
const mockCIDToken: any = {
  access_token: '9b015a3d-8820-3cb8-9c7b-8bbbc7c56461',
  refresh_token: 'b8094bcb-25a7-3cde-a09b-eb04184d572f',
  scope: 'openid',
  id_token: '"eyJhbGciOiJub25lIn0.eyJhdF9oYXNoIjoiT1dJd01UVmhNMlF0T0RneU1DMH',
  token_type: 'Bearer',
  expires_in: 3600,
};
const mockJWTToken = {
  jwtToken:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDgyNjIzMDYsImRhdGEiOnsiY3JlY',
};
const mockFormatedMobile: string = '94762347870';
const mockBonus: AxiosResponse = {
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  data: {
    rewardInfo: {
      rewardTitle: 'External_RD_1',
      rewardDescription: 'Awrudu_campaign',
    },
    responseHeader: {
      requestId: 'super-app-1650469333',
      timestamp: '2022-04-28T14:05:03.636',
      code: 'CUS1001',
      desc: 'Success',
      responseCode: '200',
    },
    resourceInfo: {
      amount: '10',
      amountUom: 'UNITS',
      validity: '30',
      validityUom: 'DAY',
    },
  },
};

export const registeredApplicationRepositoryMockFactory = jest.fn(() => ({
  save: jest.fn(() => userEntity),
  find: jest.fn(() => userEntity),
  findOne: jest.fn(() => userEntity),
  update: jest.fn(() => userEntity),
}));

describe('Test User Service', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let userHelper: UserHelper;
  let redisCacheService: RedisCacheService;
  let cache: Cache;
  let commonHelper: Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserEntity,
        RedisCacheService,
        Common,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: registeredApplicationRepositoryMockFactory,
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => 'any value',
            set: () => jest.fn(),
          },
        },
        BunyanLogger,
        UserHelper,
      ],
      imports: [CacheModule.register({})],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    userHelper = module.get<UserHelper>(UserHelper);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);
    commonHelper = module.get<Common>(Common);
    cache = module.get<any>(CACHE_MANAGER);
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('createUser should return success response ', async () => {
    const expected: any = {
      msisdn: userEntity.msisdn,
      uniqueUserIdentifier: userEntity.uniqueUserIdentifier,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      defaultLanguage: userEntity.defaultLanguage,
    };
    const mockSuccessResponse = new UserResponse(
      HttpStatus.CREATED,
      STRING.SUCCESS,
      `${STRING.USER} ${STRING.CREATE} ${STRING.SUCCESS}`,
      expected,
    );
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userEntity);
    expect(await userService.createUser(expected)).toEqual(mockSuccessResponse);
  });

  it('createUser should return already exist ', async () => {
    const expected: any = { msisdn: userEntity.msisdn };
    try {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(expected);
      await userService.createUser(userEntity);
    } catch (error) {
      expect(error.message).toBe(
        `${VALIDATIONS.USER_EXIST} ${userEntity.msisdn}`,
      );
    }
  });
  it('Test createUser with empty mobileNumber ', async () => {
    userEntity.msisdn = null;
    try {
      await userService.createUser(userEntity);
    } catch (error) {
      expect(error.message).toBe(STRING.FAIL);
    }
  });

  it('retrieveUser should return success response ', async () => {
    const mockSuccessResponse = new UserResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.USER} ${STRING.RETRIEVE} ${STRING.SUCCESS}`,
      {
        id: userEntity.id,
        msisdn: userEntity.msisdn,
        uniqueUserIdentifier: userEntity.uniqueUserIdentifier,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        email: userEntity.email,
        defaultLanguage: userEntity.defaultLanguage,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
      },
    );
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
    expect(await userService.retrieveUser(userEntity.msisdn)).toEqual(
      mockSuccessResponse,
    );
  });

  it('Test retrieveUser with empty mobileNumber', async () => {
    userEntity.msisdn = null;
    try {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await userService.retrieveUser(userEntity.msisdn);
    } catch (error) {
      expect(error.message).toBe(STRING.INVALID_USER);
    }
  });

  it('updateUser should return success response ', async () => {
    const mockSuccessResponse = new UserResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.USER} ${STRING.UPDATE} ${STRING.SUCCESS}`,
      {
        uniqueUserIdentifier: userEntity.uniqueUserIdentifier,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        email: userEntity.email,
        defaultLanguage: userEntity.defaultLanguage,
      },
    );

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
    jest.spyOn(userRepository, 'update').mockResolvedValueOnce(mockupdateData);

    expect(await userService.updateUser(userEntity.msisdn, userEntity)).toEqual(
      mockSuccessResponse,
    );
  });

  it('updateUser should return user  does not  exist ', async () => {
    try {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);

      await userService.updateUser(userEntity.msisdn, userEntity);
    } catch (error) {
      expect(error.message).toBe(
        `${VALIDATIONS.USER_NOT_EXIST} ${userEntity.msisdn}`,
      );
    }
  });

  it('should call updateUser method with expected params', async () => {
    const updateUserSpy = jest.spyOn(userService, 'updateUser');
    const msisdn = '0777231234';
    const dto = new UserUpdateDTO();
    userService.updateUser(msisdn, dto);
    expect(updateUserSpy).toHaveBeenCalledWith(msisdn, dto);
  });

  // it('authenticateUser should return success response (User Exist)', async () => {
  //   const mockSuccessResponse = new AuthResponse(
  //     HttpStatus.OK,
  //     STRING.SUCCESS,
  //     `${STRING.USER} ${STRING.AUTHENTICATE} ${STRING.SUCCESS}`,
  //     mockJWTToken,
  //   );

  //   jest.spyOn(userHelper, 'authenticate').mockResolvedValueOnce(mockCIDToken);
  //   jest.spyOn(userHelper, 'decodeToken').mockResolvedValueOnce(mockAuthdata);
  //   jest.spyOn(commonHelper, 'formatMobile');
  //   jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
  //   jest.spyOn(commonHelper, 'signToken').mockResolvedValueOnce(mockJWTToken);
  //   jest.spyOn(redisCacheService, 'setCache').mockResolvedValueOnce(null);

  //   expect(await userService.authenticateUser(mockAuthBody)).toEqual(
  //     mockSuccessResponse,
  //   );
  // });

  // it('authenticateUser should return success response (User not Exist)', async () => {
  //   const mockSuccessResponse = new AuthResponse(
  //     HttpStatus.OK,
  //     STRING.SUCCESS,
  //     `${STRING.USER} ${STRING.AUTHENTICATE} ${STRING.SUCCESS}`,
  //     mockJWTToken,
  //   );

  //   jest.spyOn(userHelper, 'authenticate').mockResolvedValueOnce(mockCIDToken);
  //   jest.spyOn(userHelper, 'decodeToken').mockResolvedValueOnce(mockAuthdata);
  //   jest.spyOn(commonHelper, 'formatMobile');
  //   jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
  //   jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userEntity);
  //   jest.spyOn(commonHelper, 'signToken').mockResolvedValueOnce(mockJWTToken);
  //   jest.spyOn(redisCacheService, 'setCache').mockResolvedValueOnce();

  //   expect(await userService.authenticateUser(mockAuthBody)).toEqual(
  //     mockSuccessResponse,
  //   );
  // });

  // it('Test authenticateUser with empty token ', async () => {
  //   const ERROR_MSG = "Cannot read property 'Mobile' of null";
  //   try {
  //     jest
  //       .spyOn(userHelper, 'authenticate')
  //       .mockResolvedValueOnce(mockCIDToken);
  //     jest.spyOn(userHelper, 'decodeToken').mockResolvedValueOnce(null);
  //     await userService.authenticateUser(mockAuthBody);
  //   } catch (error) {
  //     expect(error.message).toBe(ERROR_MSG);
  //   }
  // });

  // it('Test userHelper decodeToken with empty token ', async () => {
  //   const ERROR_MSG = "Cannot read property 'split' of null";
  //   try {
  //     await userHelper.decodeToken(null);
  //   } catch (error) {
  //     expect(error.message).toBe(ERROR_MSG);
  //   }
  // });

  it('logOutUser should return success response', async () => {
    const dto = new UserMobileDTO();
    dto.msisdn = mockFormatedMobile;
    const mockSuccessResponse = new AuthResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.USER} ${STRING.LOG_OUT} ${STRING.SUCCESS}`,
      {},
    );

    jest
      .spyOn(redisCacheService, 'getCache')
      .mockResolvedValueOnce(mockCIDToken);
    jest.spyOn(redisCacheService, 'removeCache').mockResolvedValueOnce();

    expect(await userService.logOutUser(dto)).toEqual(mockSuccessResponse);
  });

  it('Test logOutUser with empty token ', async () => {
    const ERROR_MSG = 'Cannot find cached data';
    try {
      jest.spyOn(redisCacheService, 'getCache').mockResolvedValueOnce(null);
      await userService.logOutUser({ msisdn: null });
    } catch (error) {
      expect(error.message).toBe(ERROR_MSG);
    }
  });

  it('claimBonus should return success response', async () => {
    const dto = new UserMobileDTO();
    dto.msisdn = mockFormatedMobile;
    const mockSuccessResponse = new AuthResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      `${STRING.CLAIM_BONUS} ${STRING.SUCCESS.toLowerCase()}`,
      {
        isBonusAvailable: true,
        bonusData: {
          bonus: mockBonus.data.rewardInfo?.rewardTitle,
          desc: mockBonus.data.rewardInfo?.rewardDescription,
          amount: mockBonus.data.resourceInfo?.amount,
          exp: `${mockBonus.data.resourceInfo?.validity} ${mockBonus.data.resourceInfo?.validityUom}`,
        },
      },
    );

    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userEntity);
    jest
      .spyOn(userHelper, 'getFreezoneFirstTimeBonus')
      .mockResolvedValueOnce(mockBonus);

    expect(await userService.claimBonus(dto)).toEqual(mockSuccessResponse);
  });

  it('claimBonus should return fail response', async () => {
    const dto = new UserMobileDTO();
    dto.msisdn = mockFormatedMobile;
    const ERROR_MSG = 'User not exist';
    try {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null);
      await userService.claimBonus(dto);
    } catch (error) {
      expect(error.message).toBe(ERROR_MSG);
    }
  });
});
