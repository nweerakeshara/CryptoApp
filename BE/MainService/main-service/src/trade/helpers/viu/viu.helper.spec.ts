import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { ApplicationHelper } from '../application/application.helper';
import { VIUHelper } from './viu.helper';

const mockReturnUrl = {
  redirectUrl: 'https://www.google.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};


const data = {};
const connectionReference = 'Devide';
const deviceId = 'Iphone';
describe('testing viu helper', () => {
  let viuHelper: VIUHelper;
  let applicationHelper: ApplicationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VIUHelper, ApplicationHelper],
    }).compile();

    viuHelper = module.get<VIUHelper>(VIUHelper);
    applicationHelper = module.get<ApplicationHelper>(ApplicationHelper);
  });

  it('applicationHelper  be defined', () => {
    expect(viuHelper).toBeDefined();
  });

  it('checkOperation be defined', async () => {
    jest
      .spyOn(viuHelper, 'authenticateApp')
      .mockResolvedValueOnce(mockReturnUrl);
    const result = await viuHelper.checkOperation(
      data,
      connectionReference,
      deviceId,
    );
    expect(result).toBe(mockReturnUrl);
  });

  it('checkOperation be failed', async () => {
    try {
      jest
        .spyOn(viuHelper, 'authenticateApp')
        .mockResolvedValueOnce(undefined);

      await viuHelper.checkOperation(data, connectionReference, deviceId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('checkOperation  be fail with http exception', async () => {

    try {
      await await viuHelper.checkOperation(
        null,
        connectionReference,
        deviceId,
      );

    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('authenticateApp  be fail with http exception', async () => {

    try {
      await await viuHelper.authenticateApp(
        null,
        connectionReference,
        deviceId,
      );

    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

});
