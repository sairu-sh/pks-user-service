import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getCurrentTimeStamp } from 'src/utils';

type IExceptionResponse = {
    statusCode: number;
    error?: string;
    message: string | string[];
};

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const { message } = exception;

        if (this.isErrorResponseObject(exception)) {
            const exceptionResponse = exception.getResponse() as IExceptionResponse;
            this.sendResponse(response, status, request.url, exceptionResponse.message);
            return;
        }
        this.sendResponse(response, status, request.url, message);
    }

    isErrorResponseObject(exception: HttpException) {
        if (typeof exception.getResponse() === 'object') {
            return true;
        }
        return false;
    }

    sendResponse(response: Response, status: number, path: string, message: string | string[]) {
        response.status(status).json({
            statusCode: status,
            timestamp: getCurrentTimeStamp(),
            path,
            message,
        });
    }
}
