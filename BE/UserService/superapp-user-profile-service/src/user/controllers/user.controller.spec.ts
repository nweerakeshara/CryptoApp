import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { UserResponse } from '../dtos/user.response.dto';
import { CacheModule, CACHE_MANAGER, HttpStatus } from '@nestjs/common';
import { STRING } from '../../config/const';
import { UserHelper } from '../helpers/user.helper';
import { RedisCacheService } from '../../cache/redisCache.service';
import { Common } from '../../config/common/common';
import { UserMobileDTO } from '../dtos/user.mobile.dto';

const mockAuthBody={authCode:'c79da50f-4eb1',platform:'MOBILE'}
const mockUser = {
  id: 1,
  msisdn: '0772121324',
  uniqueUserIdentifier: 2003454,
  firstName: 'John',
  lastName: 'Smith',
  email: 'smith@gmail.com',
  defaultLanguage: 'english'
};
const mockAuthdata={
        "at_hash": "OWIwMTVhM2QtODgyMC0zY2I4LTljN2ItOGJiYmM3YzU2NDYx",
        "sub": "7fab42fa-324e-4a9d-b52c-2c7b848a7018",
        "aud": [
            "Xmpkqdz_B0QJEPhfBcRYSA7Ts6Ya"
        ],
        "First Name": "janitha",
        "iss": "https://localhost:9443/oauth2/token",
        "Last Name": "lokuge",
        "exp": 1600844075081,
        "nonce": "nounce1222",
        "Mobile": "762347870",
        "iat": 1600840475081,
        "username": "762347870"
}
describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;
  let redisCacheService:RedisCacheService;
  let cacheManager: any;
  let commonHelper : Common;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        RedisCacheService,
        Common,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn().mockResolvedValue([mockUser]),
          },
        },
        BunyanLogger,
        UserHelper
      ],
      imports: [CacheModule.register({})]
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    redisCacheService = module.get<RedisCacheService>(RedisCacheService);
    commonHelper = module.get<Common>(Common);
    cacheManager = module.get<any>(CACHE_MANAGER);
  });

  it('User Controller should be define', () => {
    expect(userController).toBeDefined();
  });

  it('User Service should be define', () => {
    expect(userService).toBeDefined();
  });

  it('should have a regUser function', () => {
    expect(typeof userController.regUser).toBe('function');
  });

  it('Test createUser', async () => {
    const mockSuccessResponse = new UserResponse(
      HttpStatus.CREATED,
      STRING.SUCCESS,
      STRING.SUCCESS,
      mockUser,
    );
    jest.spyOn(userService, 'createUser').mockResolvedValueOnce(mockSuccessResponse);
    expect(await userController.regUser(mockUser)).toBe(mockSuccessResponse);
  });

  it('Test retreiveUser', async () => {
    const mockSuccessResponse = new UserResponse(
      HttpStatus.OK,
      STRING.SUCCESS,
      STRING.RETRIEVE,
      mockUser,
    );
    jest.spyOn(userService, 'retrieveUser').mockResolvedValueOnce(mockSuccessResponse);
    expect(await userController.getUser(mockUser.msisdn)).toBe(mockSuccessResponse);
  });

it('Test update user', async () => {
  const mockSuccessResponse = new UserResponse(
    HttpStatus.CREATED,
    STRING.SUCCESS,
    STRING.UPDATE,
    mockUser,
  );
  jest.spyOn(userService, 'updateUser').mockResolvedValueOnce(mockSuccessResponse);
  expect(await userController.updateUser(mockUser.msisdn,mockUser)).toBe(mockSuccessResponse);
});

it('Test Auth User', async () => {
  const mockSuccessResponse = new UserResponse(
    HttpStatus.OK,
    STRING.SUCCESS,
    `${STRING.USER} ${STRING.AUTHENTICATE} ${STRING.SUCCESS}`,
    mockAuthdata,
  );
  jest.spyOn(userService, 'authenticateUser').mockResolvedValueOnce(mockSuccessResponse);
  expect(await userController.authenticateUser(mockAuthBody)).toBe(mockSuccessResponse);
});

it('Test logOutUser', async () => {
  const dto = new UserMobileDTO()
    dto.msisdn = '94762347870'
  const mockSuccessResponse = new UserResponse(
    HttpStatus.OK,
    STRING.SUCCESS,
    `${STRING.USER} ${STRING.LOG_OUT} ${STRING.SUCCESS}`,
    {},
  );
  jest.spyOn(userService, 'logOutUser').mockResolvedValueOnce(mockSuccessResponse);
  expect(await userController.logOutUser(dto)).toBe(mockSuccessResponse);
});

});

