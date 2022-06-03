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
    return this.basketsService.getAll().then((data) => {
      return res.status(200).json(data);
    });
  }

  @Permissions('get-certain-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get(':id')
  getBaskets(@Param() params, @Res() res) {
    return this.basketsService.getBaskets(params.id);
  }

  @Permissions(`add-product-to-certain-user`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post(':id')
  addBasket(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const basket = new Baskets();
    createBasketObject(req.body, basket);
    return this.basketsService.addProduct(basket).then(() => {
      return res.status(200).json({
        message: 'Product added',
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
    return this.basketsService.deleteProduct(basket).then(() => {
      return res.status(200).json({
        message: 'Product deleted',
      });
    });
  }
}
