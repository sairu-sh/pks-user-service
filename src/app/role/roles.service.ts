import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Auth0ManagementApiConfigurationService } from 'src/config/auth0/management/auth0-management-api-configuration.service';
import { generateUUID } from 'src/utils';
import { Role } from './entities';
import { CreateRoleDto } from './dto';
import { IRoleService } from './interfaces';
import { ERROR_MESSAGES } from './constants';
import { IAuthenticatedUser } from 'src/interfaces';

@Injectable()
export class RolesService implements IRoleService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private auth0ManagementApi: Auth0ManagementApiConfigurationService,
    ) {}

    async findById(id: string): Promise<Role> {
        const foundRole = await this.roleRepository.findOne({
            where: {
                id: Equal(id),
            },
        });

        // no need to check if foundRole exists as type ORM will throw an error if not found
        return foundRole;
    }

    async findByName(name: string): Promise<Role> {
        const foundRole = await this.roleRepository.findOne({
            where: {
                name: Equal(name),
            },
        });

        // no need to check if foundRole exists as type ORM will throw an error if not found
        return foundRole;
    }

    async createRole(role: CreateRoleDto, authenticatedUser: IAuthenticatedUser): Promise<void> {
        try {
            const foundRole = await this.findByName(role.name);

            if (foundRole) {
                throw new ConflictException(ERROR_MESSAGES.ROLE_ALREADY_EXISTS(role.name));
            }

            // create role in auth0
            const { data: auth0CreatedRole } = await this.auth0ManagementApi.roles.create(role);

            // assign the idp_id provided by auth0 to the local rol
            // await this.roleRepository.insert({
            //     ...role,
            //     idp_role_id: auth0CreatedRole.id,
            //     created_by: authenticatedUser.id,
            // });
        } catch (err) {
            throw new HttpException(err.message, err.status ?? HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
