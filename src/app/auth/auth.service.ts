import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Auth0AuthApiConfigurationService } from 'src/config/auth0/authentication/auth0-authentication-api-configuration.service';
import { AUTH0_CONNECTION } from 'src/constants';
import { Auth0EnvConfigurationService } from 'src/config/auth0/env/auth0-env-configuration.service';
import { AuthApiError } from 'auth0';
import { SignInDto, SignInResponseDto } from './dto';
import { IAuthService } from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        private auth0AuthenticationApi: Auth0AuthApiConfigurationService,
        private auth0Config: Auth0EnvConfigurationService,
    ) {}

    async signin(signInPayload: SignInDto): Promise<SignInResponseDto> {
        try {
            const { data } = await this.auth0AuthenticationApi.oauth.passwordGrant({
                username: signInPayload.email,
                password: signInPayload.password,
                audience: this.auth0Config.apiIdentifier,
                realm: AUTH0_CONNECTION,
            });
            return {
                access_token: data.access_token,
                expires_in: data.expires_in,
                token_type: data.token_type,
            };
        } catch (err) {
            if (err instanceof AuthApiError) {
                throw new HttpException(err.message, err.statusCode);
            }
            throw new HttpException(
                err.message ?? 'Something went wrong',
                err.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
