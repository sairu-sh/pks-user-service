import { INestApplication, Injectable } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
    static setup(app: INestApplication) {
        const config = new DocumentBuilder()
            .setTitle('PKS User Service')
            .setDescription('The PKS User Service API description')
            .setVersion('1.0')
            .addBearerAuth({
                description: 'JWT Authorization header using the Bearer scheme',
                type: 'http',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            })
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/docs', app, document);
    }
}
