import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Privilege } from '../privilege/entities/privilege.entity';
import { Endpoint } from '../endpoint/entities/endpoint.entity';
import { Role } from '../role/entities';
import { UserGroup } from './entities';
import { User } from '../user/entities';
import { Client } from '../client/entities';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroup, User, Client, Role]), JwtModule],
})
export class RolesModule {}
