import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '../role/entities';
import { UserGroupType } from './entities';
import { User } from '../user/entities';
import { Client } from '../client/entities';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroupType, User, Client, Role]), JwtModule],
})
export class RolesModule {}
