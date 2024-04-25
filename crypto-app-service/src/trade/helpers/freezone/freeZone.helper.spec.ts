import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationHelper } from '../application/application.helper';
import { FreeZoneHelper } from './freeZone.helper';
import axios, { AxiosResponse } from 'axios';


const mockReturnUrl = { url:  'https://dynamicurl/token'};
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
  let freezoneHelper: FreeZoneHelper;
  let applicationHelper:ApplicationHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FreeZoneHelper,ApplicationHelper],
    }).compile();

    freezoneHelper = module.get<FreeZoneHelper>(FreeZoneHelper);
    applicationHelper= module.get<ApplicationHelper>(ApplicationHelper);
  });

  it('applicationHelper  be defined', () => {
    expect(freezoneHelper).toBeDefined();
  });

  it('checkOperation be defined', async () => {
    jest
      .spyOn(freezoneHelper, 'authenticateApp')
      .mockResolvedValueOnce(mockReturnUrl);
    const result = await freezoneHelper.checkOperation(
      data,
      connectionReference,
      deviceId,
    );
   

    expect(result).toBe(mockReturnUrl);
  });

  it('checkOperation be failed', async () => {
    try {
        jest
        .spyOn(freezoneHelper, 'authenticateApp')
        .mockResolvedValueOnce(null);
      await freezoneHelper.checkOperation(data, connectionReference, deviceId);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
    }
  });

  it('authentication  be defined', async () => {
    jest
      .spyOn(applicationHelper, 'getMifeAccessToken')
      .mockResolvedValueOnce(axioResult);
    const result = await freezoneHelper.authenticateApp(
      data,
      connectionReference,
      deviceId,
    );
   
   
    expect(result).toStrictEqual(mockReturnUrl);
  });

  
  it('authentication  be fail', async () => {

    try{
      jest
      .spyOn(applicationHelper, 'getMifeAccessToken')
      .mockResolvedValueOnce(null);
   await freezoneHelper.authenticateApp(
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
