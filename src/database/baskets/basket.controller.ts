import {
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTTokenService } from '@shared/services/jwt-token.service';
import { Permissions } from '@shared/decorators/permissions.decorator';
import { PermissionGuard } from '@guards/permission.guard';
import { createBasketObject } from '@baskets/utils/baskets.functions';
import { Baskets } from '@baskets/baskets.entity';
import { BasketsService } from '@baskets/baskets.service';

@Controller('basket')
export class BasketController {
  constructor(
    private basketsService: BasketsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @Permissions('get-user-products')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Get()
  getProducts(@Req() req, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      return this.basketsService.getBaskets(jwtData?.id).then((data) => {
        return res.status(200).json(data);
      });
    }
  }

  @Permissions('delete-user-product')
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Delete()
  deleteProduct(@Req() req, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return this.basketsService.deleteProduct(userProduct).then(() => {
        return res.status(200).json({
          message: 'Product deleted',
        });
      });
    }
  }

  @Permissions(`add-user-product`)
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post()
  addProduct(@Req() req, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      req.body.userId = jwtData.id;
      const userProduct = new Baskets();
      createBasketObject(req.body, userProduct);
      return this.basketsService.addProduct(userProduct).then(() => {
        return res.status(200).json({
          message: 'Product added',
        });
      });
    }
  }
}
