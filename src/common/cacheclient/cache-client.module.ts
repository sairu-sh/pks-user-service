import { Module } from '@nestjs/common';
import { RedisClientModule } from 'src/common/redisclient/redis-client.module';
import { UserModule } from '../../app/user/user.module';
import { UserCacheController } from 'src/app/internal/user-cache.controller';
import { UserService } from 'src/app/user/user.service';

@Module({
    imports: [RedisClientModule, UserModule, UserModule]
})
export class CacheClientModule {}
