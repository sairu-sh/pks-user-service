import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Endpoint } from './entities/endpoint.entity';
import { Privilege } from '../privilege/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Endpoint, Privilege]), JwtModule],
})
export class RolesModule {}