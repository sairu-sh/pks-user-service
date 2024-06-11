import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH0_ACCESS_TOKEN_DATA, AUTH0_ACCESS_TOKEN_NAME_SCOPE } from 'src/constants';
import { ConfigService } from '@nestjs/config';
import { AuthErrors } from './enum';
import { IAuthenticatedUser, IDecodedToken } from 'src/interfaces';


@Injectable()
export class Auth0Guard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const authHeader = request.headers.authorization;

            // if no bearer token in the auth header then throw error
            if (!authHeader) throw new UnauthorizedException(AuthErrors.NO_AUTH_TOKEN);

            // extracting the bearer token from the auth header
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer') throw new UnauthorizedException(AuthErrors.INVALID_TOKEN_FORMAT);

            const decodedToken: IDecodedToken = this.jwtService.decode(token);

            // extracting the access token name scope from the config
            // In auth0 documentation it is mentioned that provide auth0 nameScopes to avoid conflicts with reserved name
            // in auth0 access tokens
            const accessTokenNameScope = this.configService.getOrThrow<string>(AUTH0_ACCESS_TOKEN_NAME_SCOPE);

            request.user = {
                idp_user_id: decodedToken.sub,
                roles: decodedToken[accessTokenNameScope][AUTH0_ACCESS_TOKEN_DATA.ROLES],
                id: decodedToken[accessTokenNameScope][AUTH0_ACCESS_TOKEN_DATA.ID],
                expires_at: decodedToken.exp,
            } satisfies IAuthenticatedUser;

            return true;
        } catch (err) {
            throw new UnauthorizedException(err.message ?? AuthErrors.INVALID_TOKEN);
        }
    }
}
