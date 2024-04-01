import {
  Controller,
  Put,
  Get,
  UseInterceptors,
  Post,
  Body,
  Param, 
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ErrorInterceptor } from '../../interceptors/errors/error.interceptor';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { LOG_TYPE, LOG_MSG } from '../../config/const';
import { UserDTO } from '../dtos/user.dto';
import { UserUpdateDTO } from '../dtos/user.update.dto';

@UseInterceptors(ErrorInterceptor)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: BunyanLogger,
  ) {}

  @Post('/create')
  async regUser(@Body() userDto: UserDTO) {
    const userData = await this.userService.createUser(userDto);

    this.logger.info({
      type: `${LOG_TYPE.LOGIN_REQ}`,
      msg: LOG_MSG.VERIFY_MOBILE,
      phoneNumber: userDto.phoneNumber,
      response: userData.data,
    });
    return userData;
  }

  @Get('/:msisdn')
  async getUser(@Param('msisdn') msisdn: UserDTO['msisdn']) {
    const userData = await this.userService.retrieveUser(msisdn);

    this.logger.info({
      type: `${LOG_TYPE.RETRIEVE_REQ}`,
      msg: LOG_MSG.GET_USER,
      msisdn: msisdn,
      response: userData.data,
    });
    return userData;
  }

  @Put('/update/:id')
  async updateUser(
    @Param('id') msisdn: string,
    @Body() userDto: UserUpdateDTO,
  ) {
    const userData = await this.userService.updateUser(msisdn, userDto);

    this.logger.info({
      type: `${LOG_TYPE.UPDATE_SUCCESS}`,
      msg: LOG_MSG.UPDATE_USER,
      msisdn: userDto.msisdn,
      response: userData.data,
    });
    return userData;
  }
  
}
