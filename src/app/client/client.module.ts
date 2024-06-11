import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserGroup } from '../usergroup/entities';
import { Client } from './entities';
import { User } from '../user/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Client, UserGroup, User]), JwtModule],
})
export class RolesModule {}
