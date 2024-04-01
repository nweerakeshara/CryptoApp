import { Test, TestingModule } from '@nestjs/testing';
import { Common } from './common';
import { MSISDN_FORMAT_TYPE, VALIDATIONS } from '../const';
import { ApplicationDTO } from '../../application/dtos/application.dto'

let applicationDTO = new ApplicationDTO();
applicationDTO.appId = '0772121324',
  applicationDTO.deviceId = "1234",

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

    it('to format name', async () => {
      value = 'Superapp';

      expect(await common.formatHelperName(value)).toEqual(
        'superapp'
      );
    });


    it('to format name', async () => {
      value = '0771234567';
      const type = MSISDN_FORMAT_TYPE.MIFE
      expect(await common.formatMobile(value, type)).toEqual(
        '771234567'
      );
    });

    it('validate applicationDto request', async () => {
      expect(await common.validateApplicationDto
        (applicationDTO.appId, applicationDTO.deviceId)).toEqual(
          true
        );
    });

    it('validate applicationDto request with null params for appId', async () => {
      applicationDTO.appId = null;
      expect(await common.validateApplicationDto
        (applicationDTO.appId, applicationDTO.deviceId)).toEqual(
          false
        );
      applicationDTO.appId = '0772121324'
    });

    it('validate applicationDto request with null params for deviceId', async () => {
      applicationDTO.deviceId = null;
      expect(await common.validateApplicationDto
        (applicationDTO.appId, applicationDTO.deviceId)).toEqual(
          false
        );
      applicationDTO.deviceId = "1234"
    });

  });      