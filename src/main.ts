import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { API_PREFIX_GLOBAL, CONFIG_CORS_ORIGIN } from './constants/app.constants';
import { SwaggerService } from './common/swagger/swagger.service';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });

    const config = app.get(ConfigService);
    app.enableCors({
        origin: config.get(CONFIG_CORS_ORIGIN),
    });

    app.setGlobalPrefix(API_PREFIX_GLOBAL);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // TODO: Move these modules to shared lib
    const logger = app.get(LoggerService);
    app.useLogger(logger);

    SwaggerService.setup(app);
    app.useGlobalFilters(new GlobalExceptionFilter());

    await app.listen(8080);
}
bootstrap();
