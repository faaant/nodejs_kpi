import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';
import { createBasketObject } from '@baskets/utils/baskets.functions';
import { Baskets } from '@baskets/baskets.entity';
import { BasketsService } from '@baskets/baskets.service';
import { Request } from 'express';

@Controller('basket')
export class BasketController {
  constructor(
    private basketsService: BasketsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getProducts(@Req() req: Request) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      return await this.basketsService.getBaskets(jwtData?.id);
    }
  }

  @Permissions('delete-user-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete()
  async deleteProduct(@Req() req: Request) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return await this.basketsService.deleteProduct(userProduct);
    }
  }

  @Permissions(`add-user-product`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  async addProduct(@Req() req: Request) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return await this.basketsService.addProduct(userProduct);
    }
  }
}
