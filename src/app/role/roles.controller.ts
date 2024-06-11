import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EndpointCode, Role, User } from 'src/common/decorators';
import { IRoleService, UserRoles } from './interfaces';
import { CreateRoleDto } from './dto';
import { IAuthenticatedUser } from 'src/interfaces';
import { log } from 'console';
import { RedisClientService } from 'src/common/redisclient/redis-client.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private roleService: IRoleService, private readonly redisClientService: RedisClientService) {}

    @Post('')
    @ApiBearerAuth()
    @EndpointCode("ROLE_CREATE")
    async createRole(@Body() body: CreateRoleDto, @User() authenticatedUser: IAuthenticatedUser) {
        log("Called create role")
        return { message: 'Role created successfully' };
        // await this.roleService.createRole(body, authenticatedUser);
    }

    @Get()
    @ApiBearerAuth()
    @EndpointCode("ROLE_VIEW")
    async getRole(@User() authenticatedUser: IAuthenticatedUser){
        log("Called get role")
        return { message: 'Role fetched successfully' };
    }

    @Delete()
    @ApiBearerAuth()
    @Role(UserRoles.SUPER_ADMIN)
    async deleteRole(@User() authenticatedUser: IAuthenticatedUser) {
        log("Called delete role")
    }

    @Put()
    @ApiBearerAuth()
    @Role(UserRoles.SUPER_ADMIN)
    async updateRole(@User() authenticatedUser: IAuthenticatedUser) {
        log("Called update role")
    }
}
