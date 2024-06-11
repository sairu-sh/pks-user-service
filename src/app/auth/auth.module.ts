import { Module } from '@nestjs/common';
import { Auth0AuthApiModule } from 'src/config/auth0/authentication/auth0-authentication-api.configuration.module';
import { AuthController } from './auth.controller';
import { IAuthService } from './interfaces';
import { AuthService } from './auth.service';

@Module({
    imports: [Auth0AuthApiModule],
    controllers: [AuthController],
    providers: [
        {
            provide: IAuthService,
            useClass: AuthService,
        },
    ],
})
export class AuthModule {}
