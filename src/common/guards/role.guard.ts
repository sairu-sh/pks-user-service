import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_KEY } from '../decorators';
import { IAuthenticatedUser, IRole } from 'src/interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<IRole[]>(ROLE_KEY, context.getHandler());
        if (roles.length === 0) return true;

        const request = context.switchToHttp().getRequest();

        const user = request.user as IAuthenticatedUser;
        const userRole = user.roles;
        const canAccess = this.matchRoles(userRole, roles);

        if (!canAccess) {
            throw new UnauthorizedException(`Only roles with ${roles.join(' ')} can access the resources.`);
        }
        return true;
    }

    matchRoles(userRoles: IRole[], requiredRoles: IRole[]): boolean {
        return userRoles.some((role) => requiredRoles.includes(role));
    }
}
