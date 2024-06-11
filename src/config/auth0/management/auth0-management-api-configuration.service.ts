import { Injectable } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { Auth0EnvConfigurationService } from '../env/auth0-env-configuration.service';

@Injectable()
export class Auth0ManagementApiConfigurationService extends ManagementClient {
    constructor(auth0Config: Auth0EnvConfigurationService) {
        super({
            clientId: auth0Config.clientId,
            clientSecret: auth0Config.clientSecret,
            domain: auth0Config.domain,
        });
    }
}
