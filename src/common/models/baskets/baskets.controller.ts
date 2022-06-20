import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { BasketsService } from '@baskets/baskets.service';
import { BasketsDto } from '@baskets/dto';
import { AuthGuard } from '@nestjs/passport';
import { createBasketObject } from '@baskets/utils/baskets.functions';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';

@Controller('baskets')
export class BasketsController {
  constructor(private basketsService: BasketsService) {}

  @HttpCode(200)
  @Permissions('get-baskets')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getAll(): Promise<BasketsDto[]> {
    return this.basketsService.getAll();
  }

  @HttpCode(200)
  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  async getBaskets(@Param() params: { id: string }): Promise<BasketsDto[]> {
    return this.basketsService.getBaskets(params.id);
  }

  @HttpCode(200)
  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  async addBasket(
    @Param() params: { id: string },
    @Body() body: BasketsDto,
  ): Promise<BasketsDto> {
    body.userId = params.id;
    const basket = new BasketsDto();
    createBasketObject(body, basket);
    return this.basketsService.addProduct(basket);
  }

  @HttpCode(200)
  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  async deleteBasket(
    @Param() params: { id: string },
    @Body() body: BasketsDto,
  ): Promise<BasketsDto> {
    body.userId = params.id;
    const basket = new BasketsDto();
    createBasketObject(body, basket);
    return this.basketsService.deleteProduct(basket);
  }
}
