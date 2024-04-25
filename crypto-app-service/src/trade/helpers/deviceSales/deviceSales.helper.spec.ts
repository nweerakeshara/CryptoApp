import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { ApplicationHelper } from '../application/application.helper';
import { DeviceSalesHelper } from './deviceSales.helper';

const mockReturnUrl = {
  redirectUrl: 'https://www.google.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};


const data = {};
const connectionReference = 'Devide';
const deviceId = 'Iphone';
describe('testing viu helper', () => {
  let deviceSalesHelper: DeviceSalesHelper;
  let applicationHelper: ApplicationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceSalesHelper, ApplicationHelper],
    }).compile();

    deviceSalesHelper = module.get<DeviceSalesHelper>(DeviceSalesHelper);
    applicationHelper = module.get<ApplicationHelper>(ApplicationHelper);
  });

  it('deviceSalesHelper  be defined', () => {
    expect(deviceSalesHelper).toBeDefined();
  });

  it('checkOperation be defined', async () => {
    jest
      .spyOn(deviceSalesHelper, 'authenticateApp')
      .mockResolvedValueOnce(mockReturnUrl);
    const result = await deviceSalesHelper.checkOperation(
      data,
      connectionReference,
      deviceId,
    );
    expect(result).toBe(mockReturnUrl);
  });

  it('checkOperation be failed', async () => {
    try {
      jest
        .spyOn(deviceSalesHelper, 'authenticateApp')
        .mockResolvedValueOnce(undefined);

      await deviceSalesHelper.checkOperation(data, connectionReference, deviceId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('checkOperation  be fail with http exception', async () => {

    try {
      await await deviceSalesHelper.checkOperation(
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
      await await deviceSalesHelper.authenticateApp(
        null,
        connectionReference,
        deviceId,
      );

    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

});
