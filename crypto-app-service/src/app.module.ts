import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeModule } from './trade/modules/trade.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TradeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
