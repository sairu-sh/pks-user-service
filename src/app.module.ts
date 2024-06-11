import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Auth0EnvConfigurationModule } from './config/auth0/env/auth0-env.configuration.module';
import { Auth0ManagementApiConfigurationModule } from './config/auth0/management/auth0-management-api-configuration.module';
import { UserModule } from './app/user/user.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LiquibaseService } from './common/liquibase/liquibase.service';
import { RolesModule } from './app/role/roles.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from './common/jwt/jwt.module';
import { RedisClientModule } from './common/redisclient/redis-client.module';
import { CacheClientModule } from './common/cacheclient/cache-client.module';
import { CacheClientService } from './common/cacheclient/cache-client.service';
import { UserService } from './app/user/user.service';
import { UserRepository } from './app/user/user.repository';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        LoggerModule,
        Auth0EnvConfigurationModule,
        Auth0ManagementApiConfigurationModule,
        UserModule,
        RolesModule,
        DatabaseModule,
        AuthModule,
        JwtModule,
        CacheClientModule,
        RedisClientModule,
    ],
    controllers: [],
    providers: [LiquibaseService, CacheClientService, UserService, UserRepository],
})
export class AppModule implements OnModuleInit, NestModule {
    constructor(private readonly liquibaseService: LiquibaseService) {}

    async onModuleInit() {
        await this.liquibaseService.runLiquibase();
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
