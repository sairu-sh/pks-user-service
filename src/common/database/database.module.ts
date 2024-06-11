import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from 'src/constants';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (databaseConfig: ConfigService) => ({
                type: 'postgres',
                host: databaseConfig.getOrThrow<string>(DATABASE.HOST),
                port: databaseConfig.getOrThrow<number>(DATABASE.PORT),
                database: databaseConfig.getOrThrow<string>(DATABASE.NAME),
                username: databaseConfig.getOrThrow<string>(DATABASE.USER),
                password: databaseConfig.getOrThrow<string>(DATABASE.PASSWORD),
                autoLoadEntities: true,
                synchronize: false,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule {}
