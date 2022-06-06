import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ProductsModule } from '@products/products.module';
import { UsersModule } from '@users/users.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from '@database/entities';
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { BasketsModule } from 'common/models/baskets/baskets.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'filters/exceptions.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_DB,
      port: parseInt(process.env.PORT_DB || '5432', 10),
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    BasketsModule,
    UserPermissionsModule,
    PermissionModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
