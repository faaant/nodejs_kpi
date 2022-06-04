import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.File({
          filename:
            'logs/Combined-' + new Date(Date.now()).toDateString() + '.log',
          level: 'info',
          handleExceptions: true,
        }),
        new winston.transports.File({
          filename:
            'logs/Errors-' + new Date(Date.now()).toDateString() + '.log',
          level: 'error',
        }),
        new winston.transports.Console({
          level: 'info',
        }),
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log' }),
        new winston.transports.Console(),
      ],

      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: 'DD/MM/YYYY, HH:mm:ss',
        }),
        winston.format.printf(
          (text: any) =>
            `[Nest]  - ${[text.timestamp]}  [${text.context}] :  ${
              text.level
            }: ${text.message}`,
        ),
      ),
    }),
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
