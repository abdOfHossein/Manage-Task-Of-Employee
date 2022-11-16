import {
  CacheModule as BaseCashModule,
  DynamicModule,
  Module,
} from '@nestjs/common';
import { RedisService } from './redis.service';

const redisStore = require('cache-manager-ioredis');


@Module({})
export class RedisModule {
    static forRoot(host?: string, port?: number): DynamicModule {
        return {
          imports: [
            BaseCashModule.registerAsync({
              useFactory: () => {
                return {
                  store: redisStore,
                  host: host || '127.0.0.1',
                  port: port || 6379,
                };
              },
            }),
          ],
          module: RedisModule,
          providers: [RedisService],
          exports: [RedisService, BaseCashModule],
        };
      }
}
