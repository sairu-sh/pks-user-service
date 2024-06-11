import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH0_ENV_VARIABLES, AUTH0_REGISTER } from 'src/constants';

@Injectable()
export class Auth0EnvConfigurationService {
    constructor(private readonly configService: ConfigService) {}

    get domain(): string {
        return this.configService.get<string>(`${AUTH0_REGISTER}.${AUTH0_ENV_VARIABLES.DOMAIN}`);
    }

    get clientId(): string {
        return this.configService.get<string>(`${AUTH0_REGISTER}.${AUTH0_ENV_VARIABLES.CLIENT_ID}`);
    }

    get clientSecret(): string {
        return this.configService.get<string>(`${AUTH0_REGISTER}.${AUTH0_ENV_VARIABLES.CLIENT_SECRET}`);
    }

    get apiIdentifier(): string {
        return this.configService.get<string>(`${AUTH0_REGISTER}.${AUTH0_ENV_VARIABLES.API_IDENTIFIER}`);
    }
}
