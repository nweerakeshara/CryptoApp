import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisCacheModule } from './cache/redisCache.module';
import { getEnvPath } from './config/env.helper';
import { UserModule } from './user/modules/user.module';
import { OTPModule } from './otp/modules/otp.module';

const envFilePath: string = getEnvPath(`./envfiles`);

console.log('envFilePath-->', envFilePath);

@Module({
  imports: [
    // TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_POSTGRES_HOST,
        port: parseInt(process.env.DB_POSTGRES_PORT) || 3306,
        username: process.env.DB_POSTGRES_USER,
        password: process.env.DB_POSTGRES_PASSWORD,
        database: process.env.DB_POSTGRES_DATABASE,
        entities: [process.env.DB_POSTGRES_ENTITIES],
        synchronize: true,
      }),
    }),
    UserModule,
    RedisCacheModule,
    OTPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
