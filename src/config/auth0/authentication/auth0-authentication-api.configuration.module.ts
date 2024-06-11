import { Module } from '@nestjs/common';
import { Auth0AuthApiConfigurationService } from './auth0-authentication-api-configuration.service';

@Module({
    providers: [Auth0AuthApiConfigurationService],
    exports: [Auth0AuthApiConfigurationService],
})
export class Auth0AuthApiModule {}
