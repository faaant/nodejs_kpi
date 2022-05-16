import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { RoleModule } from './role/role.module';
import { UsersModule } from './user/users.module';
import { UsersProductsModule } from './users-products/users-products.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
