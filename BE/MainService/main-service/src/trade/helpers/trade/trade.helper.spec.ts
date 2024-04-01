import { Test, TestingModule } from '@nestjs/testing';
import { TradeHelper } from './trade.helper';
import axios, { AxiosResponse } from 'axios';
import mockAxios from 'jest-mock-axios';
import { END_POINT, MIFE_BASIC_TOKEN, MIFE_REQUEST, MIFE_STG_BASE_URL } from '../../../config/const';
import * as qs from 'qs';
import { application } from 'express';
import { HttpException } from '@nestjs/common';


const result: AxiosResponse = {
    data: 'Components',
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  };



describe('testing application helper', () => {
  let tradeHelper: TradeHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeHelper],
    }).compile();

    tradeHelper = module.get<TradeHelper>(TradeHelper);
  });

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    jest.restoreAllMocks();
  });
  it('applicationHelper  be defined', () => {
    expect(tradeHelper).toBeDefined();
  });

  it('getMifeAccessToken be defined', async () => {
    

  
    jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve("Token"));
    const result = await tradeHelper.getMifeAccessToken();
   
    
    expect(result).toBe("Token");
    
    
  });

  it('getMifeAccessToken be failed', async () => {
    

    try{await tradeHelper.getMifeAccessToken();
    
    }catch(error) {
        expect(error).toBeInstanceOf(HttpException);

    }
    
  
    
    
  });
  jest.mock('axios', () => jest.fn());

//   it('request be defined', async () => {
 
//     const mRes = { status: 200, data: 'fake data' };
//     axios.apply
//     // let method = 'post';
//     let url = 'http://bit.ly/2mTM3nY';
//     let data ={
//         firstName: 'Fred',
//         lastName: 'Flintstone'
//       }
//     let headers = {'X-Custom-Header': 'foobar'}
   
//     jest.spyOn(axios, 'post').mockReturnValueOnce(Promise.resolve("Token"));
//     // const result = await applicationHelper.request('POST',url,data,headers);
//     await expect( applicationHelper.request('POST',url,data,headers)).resolves.toEqual("Token");
    

    
//     // expect(result).toBeDefined();
    
    
//   });

  it('request be failed', async () => {
    let method = "create";
    let url = "";
    let data ={}
    let headers = {}
    try{
      
    const result = await tradeHelper.request(method,url,data,headers);
    
    
    expect(result).toBeDefined();
    
    }catch (error){
        expect(error).toBeInstanceOf(HttpException);

    }


    
    
    
  });


  // it('request   be defined', async () => {
    //    let method ={};
    //    let url = "";
    //    let data ={}
    //    let headers = {}
    //    const response = await axios({})

  //     expect(await applicationHelper.request(method,url,data,headers)).toBeDefined();
  //   });

//   it('getMifeAccessToken defined', async () => {
//     // let method ={};
//     // let url = "";
//     // let data ={}
//     // let headers = {}
//     // const response = await axios({})


//     expect(await applicationHelper.getMifeAccessToken()).toBeDefined();
//   });

  


  
});
