import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from '@products/products.module';

import { UsersModule } from '@users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
