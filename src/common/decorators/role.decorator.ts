import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { IRole } from 'src/interfaces';
import { Auth0Guard, RoleGuard } from '../guards';

export const ROLE_KEY = 'role';

export const CanAccessRoles = (...roles: IRole[]) => SetMetadata(ROLE_KEY, roles);

// Role decorator which checks if the authenticated user has any one of these roles
// eg: @Role("SUPER_ADMIN") will allow only SUPER_ADMIN to access the services
export function Role(...roles: IRole[]) {
    return applyDecorators(CanAccessRoles(...roles), UseGuards(Auth0Guard, RoleGuard));
}
