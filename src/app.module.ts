import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/product/products.controller';
import { UsersController } from './controllers/users/users.controller';
import entities from './typeorm/entities';

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
  ],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
