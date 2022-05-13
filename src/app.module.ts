import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/product/products.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService],
})
export class AppModule {}
