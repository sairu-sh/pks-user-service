import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Privilege } from '../privilege/entities/privilege.entity';
import { Endpoint } from '../endpoint/entities/endpoint.entity';
import { Role } from '../role/entities';
import { UserModule } from '../user/user.module';
import { UserCacheController } from './user-cache.controller';

@Module({
    imports: [UserModule],
    controllers: [UserCacheController]
})
export class RolesModule {}