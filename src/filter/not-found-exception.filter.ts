import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import type { IExceptionResponse } from './exception.interface';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: FastifyReply<any> = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse() as IExceptionResponse;

    response.status(status).send({
      statusCode: responseBody.statusCode,
      message: responseBody.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
