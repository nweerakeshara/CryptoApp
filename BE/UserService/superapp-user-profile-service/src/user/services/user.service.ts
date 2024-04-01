import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from '../dtos/user.response.dto';
import { UserDTO } from '../dtos/user.dto';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { UserEntity } from './../entities/user.entity';
import { Repository } from 'typeorm';
import { UserUpdateDTO } from '../dtos/user.update.dto';

import {
  STRING,
  LOG_TYPE,
  LOG_MSG,
  VALIDATIONS,  
  TOKEN_EXP,
  PLATFORMS,  
  FREEZONE_BONUS, 
} from '../../config/const';
import { RedisCacheService } from '../../cache/redisCache.service';
import { UserMobileDTO } from '../dtos/user.mobile.dto';
import { Common } from '../../config/common/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private logger: BunyanLogger,
    private redisCacheService: RedisCacheService,
    private commonHelper: Common,
  ) {}

  async createUser(userDto: UserDTO): Promise<UserResponse> {
    const {
      msisdn,
      uniqueUserIdentifier,
      firstName,
      lastName,
      email,
      defaultLanguage,
    } = userDto;
    try {
      console.log('---** CREATE USER METHOD**--->');
      if (msisdn) {
        const user = new UserEntity();
        user.msisdn = msisdn;
        user.uniqueUserIdentifier = uniqueUserIdentifier;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.defaultLanguage = defaultLanguage;

        const userData = await this.userRepository.findOne({
          msisdn: user.msisdn,
        });
        if (userData) {
          throw new HttpException(
            { message: `${VALIDATIONS.USER_EXIST} ${msisdn}`, msisdn },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }

        await this.userRepository.save(user);
        return new UserResponse(
          HttpStatus.CREATED,
          STRING.SUCCESS,
          `${STRING.USER} ${STRING.CREATE} ${STRING.SUCCESS}`,
          userDto,
        );
      } else {
        throw new HttpException(STRING.FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } catch (error) {
      this.logger.error({
        msisdn,
        data: { msisdn },
        type: `${LOG_TYPE.LOGIN_ERROR}`,
        msg: LOG_MSG.VERIFY_MOBILE,
        error: error.message,
      });
      throw new HttpException(error.message, error.status);
    }
  }

  async retrieveUser(msisdn: string): Promise<UserResponse> {
    try {
      const userData = await this.userRepository.findOne({
        msisdn,
      });

      if (userData) {
        return new UserResponse(
          HttpStatus.OK,
          STRING.SUCCESS,
          `${STRING.USER} ${STRING.RETRIEVE} ${STRING.SUCCESS}`,
          userData,
        );
      } else {
        throw new HttpException(
          STRING.INVALID_USER,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error({
        msisdn,
        data: { msisdn },
        type: `${LOG_TYPE.RETRIEVE_ERROR}`,
        msg: LOG_MSG.GET_USER,
        error: error.message,
      });
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUser(
    msisdn: string,
    userDto: UserUpdateDTO,
  ): Promise<UserResponse> {
    const {
      uniqueUserIdentifier,
      firstName,
      lastName,
      email,
      defaultLanguage,
    } = userDto;

    try {
      const userData = await this.userRepository.findOne({
        msisdn,
      });

      if (userData) {
        const user = new UserEntity();
        uniqueUserIdentifier ? user.uniqueUserIdentifier = uniqueUserIdentifier :
        user.uniqueUserIdentifier = userData.uniqueUserIdentifier;
        firstName ? user.firstName = firstName : user.firstName = userData.firstName;     
        lastName ? user.lastName = lastName : user.lastName = userData.lastName; 
        email ? user.email = email : user.email = userData.email;
        defaultLanguage? user.defaultLanguage = defaultLanguage : 
        user.defaultLanguage = userData.defaultLanguage;     

        await this.userRepository.update(userData.id, user);
        return new UserResponse(
          HttpStatus.OK,
          STRING.SUCCESS,
          `${STRING.USER} ${STRING.UPDATE} ${STRING.SUCCESS}`,
          user,
        );
      } else {
        throw new HttpException(
          { message: `${VALIDATIONS.USER_NOT_EXIST} ${msisdn}`, msisdn },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error({
        msisdn,
        data: { msisdn },
        type: `${LOG_TYPE.UPDATE_FAIL}`,
        msg: LOG_MSG.UPDATE_UNSUCCESFULL,
        error: error.message,
      });
      throw new HttpException(error.message, error.status);
    }
  }
 
}
