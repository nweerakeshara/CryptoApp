import { Test, TestingModule } from '@nestjs/testing';
import { Common } from './common';
import { VALIDATIONS } from '../const';
import { URLSearchParams } from 'url';

describe('Common', () => {
    let common: Common;
    let value: string;
    let status: boolean;
    let response: string;

    beforeEach(async () => {   
        
        const module: TestingModule = await Test.createTestingModule({     
            providers: [
                Common
               ],
          }).compile();

        common = module.get<Common>(Common);
    });

    it('common should be defined', () => {
        expect(common).toBeDefined();
    });

    it('convert to international number', async () => {
        value = "0771234567";
        response = `${VALIDATIONS.SL_COUNTRY_CODE}${value.substring(
          value.length - 9,
          value.length,
        )}`;        
        expect(await common.convertToInternationalMobile(value)).toEqual(
          response
        );
      });

      it('convert to local number', async () => {
        value = "94771234567";
        response = `0${value.substring(value.length - 9, value.length)}`;        
        expect(await common.convertToLocalMobile(value)).toEqual(
          response
        );
      });

      it('to generate url params', async () => {
        value = "0771234567";
        response = new URLSearchParams(value).toString();
        expect(await common.generateURLParam(value)).toEqual(
          response
        );
      });

      it('to validate mobile number with null value', async () => {
        value = null;
        status = true;
        expect(await common.validateMobileNumber(value)).toEqual(
         !status
        );
      });
    
      it('to validate mobile number with null value', async () => {
        value = null;
        status = true;
        expect(await common.validateMobileNumber(value)).toEqual(
        !status
        );
      });

      it('to validate mobile number with invalid value', async () => {
        value = '0771234';
        status = true;
        expect(await common.validateMobileNumber(value)).toEqual(
        !status
        );
      });

      it('to validate mobile number with correct value', async () => {
        value = '0771234567';
        status = true;
        expect(await common.validateMobileNumber(value)).toEqual(
        status
        );
      });

});      