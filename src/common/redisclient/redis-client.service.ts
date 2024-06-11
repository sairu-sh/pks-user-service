import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { log } from 'console';

@Injectable()
export class RedisClientService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async setValue(key: string, value: string): Promise<void> {
    log("Reached redis to set client, ", key);
    log("Reached redis to set client value, ", value);
    await this.cacheManager.set(key, value);
  }

  async getValue(key: string): Promise<string> {
    log("Reached redis to get client, ", key);
    return this.cacheManager.get<string>(key);
  }
}
