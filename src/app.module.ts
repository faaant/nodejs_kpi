import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { PermissionModule } from './database/permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { JwtinsertionMiddleware } from './jwtinsertion.middleware';
import { UsersModule } from './database/user/users.module';
import { UsersProductsModule } from './database/users-products/users-products.module';
import { ProductsModule } from './database/products/products.module';
import { UserPermissionsModule } from './database/user-permissions/user-permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'store',
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    PermissionModule,
    UsersProductsModule,
    ProductsModule,
    HttpModule,
    AuthModule,
    SharedModule,
    UserPermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtinsertionMiddleware).exclude('auth/(.*)').forRoutes('*');
  }
}
