import { Test, TestingModule } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { Common } from '../config/common/common';
import { Next } from '@nestjs/common';
import { VALIDATIONS } from '../config/const';
import * as httpMocks from 'node-mocks-http';

describe('AuthMiddleware', () => {
    let authMiddleware: AuthMiddleware;   
    let commonHelper: Common;   
    let req: any;

    beforeEach(async () => {   
        
        const module: TestingModule = await Test.createTestingModule({     
          providers: [
           AuthMiddleware,
           Common,
          ],
          }).compile();
          authMiddleware = module.get<AuthMiddleware>(AuthMiddleware); 
          commonHelper = module.get<Common>(Common);         
    });

    it('authMiddleware should be defined', () => {
        expect(authMiddleware).toBeDefined();
    });

    it('validate valid mobile number using use', async () => {
      req  = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        params: {
          msisdn: "0771234567"
        }
      }); 
      
      jest.spyOn(commonHelper, 'validateMobileNumber').mockReturnValueOnce(true);      
      expect(await authMiddleware.use(req, null, () => Next())).not.toBe( false ); 
      
    });
    

    it('validate empty mobile number using use', async () => {
      req  = httpMocks.createRequest({
        method: 'GET',
        url: '/user',
        params: {
          msisdn: null
        }
      }); 


      try {
        jest.spyOn(commonHelper, 'validateMobileNumber').mockReturnValueOnce(false);      
        await authMiddleware.use(req, null, () => Next());     
      } catch (error) {
        expect(error.message).toBe(VALIDATIONS.INVALID_MOBILE);
      }
    });

});      