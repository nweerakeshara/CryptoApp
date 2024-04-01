import {
  Module,NestModule,MiddlewareConsumer,
  RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeService } from '../services/trade.service';
import { TradeController } from '../controllers/trade.controller';
import { AuthMiddleware } from '../../core/auth.middleware';
import { Common } from '../../config/common/common';
import { TradeHelper } from '../helpers/trade/trade.helper';
import { BunyanLogger } from '../../logger/bunyan-logger';
import { TradeEntity } from '../entities/trade.entity'
import { StarPointHelper } from '../helpers/starpoint/starPoint.helper';
import { FreeZoneHelper } from '../helpers/freezone/freeZone.helper';
import { VIUHelper} from '../helpers/viu/viu.helper';
import { MegaGamesHelper } from '../helpers/megagames/megaGames.helper';
import { DeviceSalesHelper } from '../helpers/deviceSales/deviceSales.helper';
//import { RedisCacheModule } from '../../cache/redisCache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature( 
      [TradeEntity]
    ),//RedisCacheModule
  ],
  providers: [TradeService,Common,TradeHelper,BunyanLogger],
  controllers: [TradeController],
})
export class TradeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'application/*',
        method: RequestMethod.GET,
      },
      {
        path: 'application/*',
        method: RequestMethod.POST,
      },
      {
        path: 'application/:id',
        method: RequestMethod.DELETE,
      },
    );
  }
}
