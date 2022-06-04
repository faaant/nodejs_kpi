import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ProductsModule } from '@products/products.module';
import { UsersModule } from '@users/users.module';
import { UserPermissionsModule } from 'database/user-permissions/user-permissions.module';
import { PermissionModule } from 'database/permissions/permissions.module';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { LoggerMiddleware } from 'middlewares/logger.middleware';
import { BasketsModule } from '@baskets/baskets.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'filters/exceptions.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'store',
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
    ConfigModule.forRoot({
      envFilePath: 'src/.env',
    }),
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
