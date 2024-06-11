import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IUserService } from './interfaces';
import { User } from './entities';
import { RolesModule } from '../role/roles.module';
import { UserGroup } from '../usergroup/entities';
import { Client } from '../client/entities';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository, User,  UserGroup, Client]), RolesModule, JwtModule],
    controllers: [UserController],
    providers: [
        {
            provide: IUserService,
            useClass: UserService,
            
        },
        UserRepository
    ],
})
export class UserModule {}
