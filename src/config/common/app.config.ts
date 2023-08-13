import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * App 세팅
 *
 * @param {INestApplication} app
 */
export function setupApp(app: INestApplication): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const error = errors.map((e) => ({
          [e.property]: e.constraints,
        }));
        return new BadRequestException(error);
      },
    }),
  );
}
