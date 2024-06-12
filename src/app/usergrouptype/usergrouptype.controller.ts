import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/common/logger/logger.service';
import { User } from 'src/common/decorators';
import { IAuthenticatedUser } from 'src/interfaces';
import { IUserGroupTypeService } from './interfaces';
// import { AssignRoleDto, CreateUserDto } from './dto';
// import { UserRoles } from '../roles/interfaces';

@Controller('usergroup-types')
@ApiTags('Usergroup-types')
export class UserGroupTypesController {
    constructor(
        private readonly logger: LoggerService,
        private readonly userGroupTypeService: IUserGroupTypeService,
    ) {}

    @Get('')
    @ApiBearerAuth()
    // @Role(UserRoles.SUPER_ADMIN)
    async getGroupTypes(@User() authenticatedUser: IAuthenticatedUser) {
        try {
            await this.userGroupTypeService.getAllTypes(authenticatedUser);
        } catch (error) {
            this.logger.error('failed to fetch group types', error);
            throw error;
        }
    }
}
