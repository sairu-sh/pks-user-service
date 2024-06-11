import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) {}

    use(req: Request, res: Response, next: NextFunction): void {
        res.on('finish', () => {
            const message = `${req.method} ${req.originalUrl} ${res.statusCode}`;
            this.logger.log(message);
        });

        next();
    }
}
