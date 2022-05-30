import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { ProductsModule } from '@products/products.module';
import { UsersModule } from '@users/users.module';
import { UsersProductsModule } from '@users-products/users-products.module';
import { UserPermissionsModule } from 'database/user-permissions/user-permissions.module';
import { PermissionModule } from 'database/permissions/permissions.module';
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@shared/shared.module';
import { JwtinsertionMiddleware } from './middlewares/jwt-insertion.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { LoggerMiddleware } from 'middlewares/logger.middleware';

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
    UsersProductsModule,
    UserPermissionsModule,
    PermissionModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtinsertionMiddleware).exclude('auth/(.*)').forRoutes('*');
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
