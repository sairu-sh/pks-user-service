import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Privilege } from '../privilege/entities/privilege.entity';
import { Endpoint } from '../endpoint/entities/endpoint.entity';
import { Role } from '../role/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Privilege, Endpoint, Role]), JwtModule],
})
export class RolesModule {}