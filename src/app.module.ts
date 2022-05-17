import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { ProductsModule } from './products/products.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './user/users.module';
import { UsersProductsModule } from './users-products/users-products.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { JwtinsertionMiddleware } from './jwtinsertion.middleware';

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
    RoleModule,
    UsersProductsModule,
    ProductsModule,
    HttpModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtinsertionMiddleware)
      .exclude("auth/(.*)")
      .forRoutes("*");
  }
}
