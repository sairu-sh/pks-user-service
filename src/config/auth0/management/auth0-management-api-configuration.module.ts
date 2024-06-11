import { Global, Module } from '@nestjs/common';
import { Auth0ManagementApiConfigurationService } from './auth0-management-api-configuration.service';

@Global()
@Module({
    providers: [Auth0ManagementApiConfigurationService],
    exports: [Auth0ManagementApiConfigurationService],
})
export class Auth0ManagementApiConfigurationModule {}
