import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Auth0ManagementApiConfigurationService } from 'src/config/auth0/management/auth0-management-api-configuration.service';
import { generatePassword } from 'src/utils/';
import { AUTH0_CONNECTION } from 'src/constants';
import { GetUsers200ResponseOneOfInner, ManagementApiError } from 'auth0';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto';
import { IUserService, ERROR_MESSAGES, Auth0ManagementApiErrorCode } from './interfaces';
import { User } from './entities';
import { IRoleService } from '../role/interfaces';
import { IAuthenticatedUser } from 'src/interfaces';
import { UserRepository } from './user.repository';
import { RedisClientService } from 'src/common/redisclient/redis-client.service';
import { log } from 'console';
import { Endpoint } from '../endpoint/entities';

@Injectable()
export class UserService 
// implements IUserService 
{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly auth0ManagementApi: Auth0ManagementApiConfigurationService,
        private readonly roleService: IRoleService,
        private readonly redisClient: RedisClientService
    ) {}

    async findByEmail(email: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            relations: ['role'],
            where: {
                email,
            },
        });

        return foundUser;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({
            relations: ['role'],
            where: {
                id,
            },
        });

        return user;
    }

    async createUserInAuth0(newUser: CreateUserDto, userId: string): Promise<GetUsers200ResponseOneOfInner> {
        try {
            const { data: newAuth0User } = await this.auth0ManagementApi.users.create({
                connection: AUTH0_CONNECTION,
                email: newUser.email,
                password: generatePassword(),
                user_metadata: {
                    pks_user_id: userId,
                },
            });
            return newAuth0User;
        } catch (err) {
            const error = err as ManagementApiError;
            if (error.errorCode === Auth0ManagementApiErrorCode.IDP_ERROR) {
                throw new HttpException(ERROR_MESSAGES.USER_ALREADY_EXISTS(newUser.email), err.statusCode);
            }
        }
    }

    async persistUser(newUser: CreateUserDto, authenticatedUserId: string): Promise<User> {
        try {
            const newLocalDbUser = await this.userRepository.save({
                ...newUser,
                created_by: authenticatedUserId,
            });

            return newLocalDbUser;
        } catch (err) {
            throw new HttpException(err.message, err.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createUser(newUser: CreateUserDto, authenticatedUser: IAuthenticatedUser) {
        try {
            // searching whether the user with given email exists or not in the database
            const user = await this.findByEmail(newUser.email);

            if (user) {
                throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS(newUser.email));
            }

            // creating the user in the database
            const persistedUser = await this.persistUser(newUser, authenticatedUser.id);

            // creating user in auth0
            const idpUser = await this.createUserInAuth0(newUser, persistedUser.id);

            // assigning userId provided by auth0
            persistedUser.idp_user_id = idpUser.user_id;

            // updating the user in the database
            await this.userRepository.save(persistedUser);
        } catch (err) {
            throw new HttpException(err.message, err.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async assignRoleInAuth0(idpUserId: string, idpRoleId: string): Promise<void> {
        try {
            await this.auth0ManagementApi.users.assignRoles(
                {
                    id: idpUserId,
                },
                {
                    roles: [idpRoleId],
                },
            );
        } catch (err) {
            const error = err as ManagementApiError;
            throw new HttpException(error.message, error.statusCode);
        }
    }

    // async assignRole(userId: string, roleId: string): Promise<void> {
    //     try {
    //         const user = await this.findById(userId);
    //         if (user.role !== null) {
    //             throw new ConflictException(ERROR_MESSAGES.ROLE_ALREADY_ASSIGNED(user.email, user.role.name));
    //         }

    //         const role = await this.roleService.findById(roleId);

    //         // assigning role in auth0
    //         await this.assignRoleInAuth0(user.idp_user_id, role.idp_role_id);

    //         // assigning role in local db
    //         user.role = role;
    //         await this.userRepository.save(user);
    //     } catch (err) {
    //         throw new HttpException(err.message, err.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }

    async invalidateUserCache(idpUserId: string) {
        var endpoints = await this.getUserEndpoints(idpUserId);
        var endpointCodes = endpoints.map((endpoint: Endpoint) => endpoint.code);
        log("endpoints codes", endpointCodes);
        this.redisClient.setValue(idpUserId, JSON.stringify(endpointCodes));
        return endpointCodes;
    }

    async getUserEndpoints(idpUserId: string) {
        return await this.userRepository.findUserEndpoints(idpUserId);
    }
}
