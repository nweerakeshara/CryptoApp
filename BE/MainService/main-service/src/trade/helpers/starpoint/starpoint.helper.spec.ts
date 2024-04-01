import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { ApplicationHelper } from '../application/application.helper';
import { StarPointHelper } from './starPoint.helper';

const mockReturnUrl = {
  redirectUrl: 'https://www.google.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const mockReturnToken = {
  redirectUrl: undefined,
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
};

const axioUrlResult: AxiosResponse = {
  data: {
    url: 'https://www.google.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  },
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},

};

const axioResult: AxiosResponse = {
  data: 'Components',
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
};

const data = {};
const connectionReference = 'Devide';
const deviceId = 'Iphone';
describe('testing starpoint helper', () => {
  let starpointHelper: StarPointHelper;
  let applicationHelper:ApplicationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarPointHelper,ApplicationHelper],
    }).compile();

    starpointHelper = module.get<StarPointHelper>(StarPointHelper);
    applicationHelper= module.get<ApplicationHelper>(ApplicationHelper);
  });

  it('applicationHelper  be defined', () => {
    expect(starpointHelper).toBeDefined();
  });

  it('checkOperation be defined', async () => {
    jest
      .spyOn(starpointHelper, 'authenticateApp')
      .mockResolvedValueOnce(mockReturnUrl);
    const result = await starpointHelper.checkOperation(
      data,
      connectionReference,
      deviceId,
    );
   

    expect(result).toBe(mockReturnUrl);
  });

  it('checkOperation be failed', async () => {
    try {
        jest
        .spyOn(starpointHelper, 'authenticateApp')
        .mockResolvedValueOnce(undefined);

      await starpointHelper.checkOperation(data, connectionReference, deviceId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
     
    }
  });

  it('authentication  be defined', async () => {
    jest
      .spyOn(applicationHelper, 'getMifeAccessToken')
      .mockResolvedValueOnce(axioResult);

      jest
      .spyOn(applicationHelper, 'request')
      .mockResolvedValueOnce(axioUrlResult);
    const result = await starpointHelper.authenticateApp(
      data,
      connectionReference,
      deviceId,
    );
   

    expect(result).toStrictEqual(mockReturnToken);
  });


  it('authentication  be fail', async () => {

    try{
      jest
      .spyOn(applicationHelper, 'getMifeAccessToken')
      .mockResolvedValueOnce(null);
   await starpointHelper.authenticateApp(
      data,
      connectionReference,
      deviceId,
    );

    }catch (error){
      expect(error).toBeInstanceOf(HttpException)
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)

    }
    
   
  });

});
