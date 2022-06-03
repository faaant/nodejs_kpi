import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
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
  @Get('/all')
  getAll(@Res() res) {
    return this.basketsService
      .getAll()
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((err) => {
        return res.status(500).json({
          message: err?.message ?? 'Fail to get all products',
        });
      });
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  getBaskets(@Param() params, @Res() res) {
    return this.basketsService.getBaskets(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user products',
      });
    });
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addBasket(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const basket = new Baskets();
    createBasketObject(req.body, basket);
    this.basketsService
      .addProduct(basket)
      .then(() => {
        return res.status(200).json({
          message: 'Product added',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to add product',
        });
      });
  }

  @Permissions(`delete-product-from-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete(':id')
  deleteBasket(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const basket = new Baskets();
    createBasketObject(req.body, basket);
    this.basketsService
      .deleteProduct(basket)
      .then(() => {
        return res.status(200).json({
          message: 'Product deleted',
        });
      })
      .catch((err) => {
        const statusCode = err?.message ? 400 : 500;
        return res.status(statusCode).json({
          message: err?.message ?? 'Fail to delete product',
        });
      });
  }
}
