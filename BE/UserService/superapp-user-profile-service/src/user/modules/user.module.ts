import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { Common } from '../../config/common/common';
import { UserHelper } from '../helpers/user.helper';
import { BunyanLogger } from '../../logger/bunyan-logger';
import {UserEntity} from './../entities/user.entity'
import { RedisCacheModule } from '../../cache/redisCache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature( 
      [UserEntity]
    ),
    RedisCacheModule
  ],
  providers: [UserService, Common, UserHelper, BunyanLogger],
  controllers: [UserController],
})
export class UserModule {}
