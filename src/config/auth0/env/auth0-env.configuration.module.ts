import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import auth0EnvConfiguration from './auth0-env.configuration';
import { Auth0EnvConfigurationService } from './auth0-env-configuration.service';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [auth0EnvConfiguration],
        }),
    ],
    providers: [ConfigService, Auth0EnvConfigurationService],
    exports: [ConfigService, Auth0EnvConfigurationService],
})
export class Auth0EnvConfigurationModule {}
