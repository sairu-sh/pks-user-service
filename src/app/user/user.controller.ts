import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/common/logger/logger.service';
import { Role, User } from 'src/common/decorators';
import { IUserService } from './interfaces';
import { AssignRoleDto, CreateUserDto } from './dto';
import { UserRoles } from '../role/interfaces';
import { IAuthenticatedUser } from 'src/interfaces';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly logger: LoggerService,
        private readonly userService: IUserService,
    ) {}

    @Post('')
    @ApiBearerAuth()
    @Role(UserRoles.SUPER_ADMIN)
    async createUser(@Body() body: CreateUserDto, @User() authenticatedUser: IAuthenticatedUser) {
        try {
            await this.userService.createUser(body, authenticatedUser);
        } catch (error) {
            this.logger.error('failed to create user', error);
            throw error;
        }
    }

    @Post('/:id/roles')
    @ApiBearerAuth()
    @Role(UserRoles.SUPER_ADMIN)
    async assignRole(@Param('id') userId: string, @Body() body: AssignRoleDto) {
        return this.userService.assignRole(userId, body.roleId);
    }
}
