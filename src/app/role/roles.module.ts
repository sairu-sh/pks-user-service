import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './entities';
import { IRoleService } from './interfaces';
import { UserGroup } from '../usergroup/entities';
import { Privilege } from '../privilege/entities/privilege.entity';
import { RedisClientModule } from 'src/common/redisclient/redis-client.module';
import { EndPointGuard } from 'src/common/guards/endpoint.guard';
import { CacheClientService } from 'src/common/cacheclient/cache-client.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Role, UserGroup, Privilege]), JwtModule, RedisClientModule],
    controllers: [RolesController],
    providers: [
        {
            provide: IRoleService,
            useClass: RolesService,
        },
        EndPointGuard,
        CacheClientService,
        UserService,
        UserRepository
    ],
    exports: [IRoleService],
})
export class RolesModule {}
