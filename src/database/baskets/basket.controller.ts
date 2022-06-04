import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
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

  @HttpCode(200)
  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  async getProducts(@Req() req: Request): Promise<Baskets[] | undefined> {
    const jwtData = this.jwtTokenService.decode(req.cookies?.jwt);
    if (typeof jwtData === 'object') {
      return this.basketsService.getBaskets(jwtData?.id);
    }
  }

  @HttpCode(200)
  @Permissions('delete-user-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete()
  async deleteProduct(@Req() req: Request): Promise<Baskets | undefined> {
    const jwtData = this.jwtTokenService.decode(req.cookies?.jwt);
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData?.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return this.basketsService.deleteProduct(userProduct);
    }
  }

  @HttpCode(200)
  @Permissions(`add-user-product`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  async addProduct(@Req() req: Request): Promise<Baskets | undefined> {
    const jwtData = this.jwtTokenService.decode(req.cookies?.jwt);
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData?.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return this.basketsService.addProduct(userProduct);
    }
  }
}
