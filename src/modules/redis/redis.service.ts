import {CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
    nestLogger: any = undefined;
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
      this.nestLogger = new NestLogger('Redis_Logger');
    }
    async setKeyNoExpire(key: string, value: string) {
      await this.cacheManager.set(key, value, 0)
    }
    async setKey(key: string, value: string, ttl?: number) {
      await this.cacheManager.set(key, value, ttl);
    }
    async getKey(key: string): Promise<Record<string, any>> {
      const result = await this.cacheManager.get<string>(key);
      return JSON.parse(result);
    }
}
