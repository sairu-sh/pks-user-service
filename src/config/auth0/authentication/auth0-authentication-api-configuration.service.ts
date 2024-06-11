import { Injectable } from '@nestjs/common';
import { AuthenticationClient } from 'auth0';
import { Auth0EnvConfigurationService } from '../env/auth0-env-configuration.service';

@Injectable()
export class Auth0AuthApiConfigurationService extends AuthenticationClient {
    constructor(auth0Config: Auth0EnvConfigurationService) {
        super({
            clientId: auth0Config.clientId,
            domain: auth0Config.domain,
            clientSecret: auth0Config.clientSecret,
        });
    }
}
