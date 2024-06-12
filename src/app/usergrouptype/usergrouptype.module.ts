import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserGroupTypesController } from './usergrouptype.controller';
import { UserGroupTypeService } from './usergrouptype.service';
import { IUserGroupTypeService } from './interfaces';
import { UserGroupType } from './entities';
import { RolesModule } from '../role/roles.module';
import { UserGroup } from '../usergroup/entities';
import { Client } from '../client/entities';

@Module({
    imports: [TypeOrmModule.forFeature([UserGroupType, UserGroup, Client]), RolesModule, JwtModule],
    controllers: [UserGroupTypesController],
    providers: [
        {
            provide: IUserGroupTypeService,
            useClass: UserGroupTypeService,
        },
    ],
})
export class UserModule {}
