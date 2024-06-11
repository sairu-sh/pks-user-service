import { Global, Module } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisController } from './redis.controller';

@Global()
@Module({
    imports: [
        ConfigModule,
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            store: redisStore,
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
            ttl: 700, // optional, time to live in seconds
          }),
          inject: [ConfigService],
        }),
      ],
    providers: [RedisClientService],
    exports: [RedisClientService],
    controllers: [RedisController],
})

export class RedisClientModule {}
