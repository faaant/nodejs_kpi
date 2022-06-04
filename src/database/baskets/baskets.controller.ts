import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BasketsService } from '@baskets/baskets.service';
import { Baskets } from '@baskets/baskets.entity';
import { AuthGuard } from '@nestjs/passport';
import { createBasketObject } from '@baskets/utils/baskets.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('baskets')
export class BasketsController {
  constructor(private basketsService: BasketsService) {}

  @Permissions('get-baskets')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getAll() {
    return await this.basketsService.getAll();
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  async getBaskets(@Param() params: { id: string }) {
    return await this.basketsService.getBaskets(params.id);
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  async addBasket(@Param() params: { id: string }, @Body() body: Baskets) {
    body.userId = params.id;
    const basket = new Baskets();
    createBasketObject(body, basket);
    return await this.basketsService.addProduct(basket);
  }

  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteBasket(@Param() params: { id: string }, @Body() body: Baskets) {
    body.userId = params.id;
    const basket = new Baskets();
    createBasketObject(body, basket);
    return await this.basketsService.deleteProduct(basket);
  }
}
