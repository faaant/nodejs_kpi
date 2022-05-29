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
import { UsersProductsService } from '@users-products/users-products.service';
import { UserProducts } from '@users-products/user-products.entity';
import { AuthGuard } from '@nestjs/passport';
import { JWTTokenService } from '@shared/jwt-token.service';
import { createUserProductObject } from './utils/users-products.functions';

@Controller('list/products')
export class UsersProductsController {
  constructor(
    private usersProductsService: UsersProductsService,
    private jwtTokenService: JWTTokenService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  getAll(@Res() res) {
    return this.usersProductsService
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getProducts(@Req() req, @Res() res) {
    const jwtData = this.jwtTokenService.decode(
      req.headers['authorization'].split(' ')[1],
    );
    if (typeof jwtData === 'object') {
      return this.usersProductsService
        .getUserProducts(jwtData?.id)
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch(() => {
          return res.status(500).json({
            message: 'Fail to get products',
          });
        });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteProduct(@Req() req, @Res() res) {
    if (req?.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        req.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        req.body.userId = jwtData.id;
        const userProduct = new UserProducts();
        createUserProductObject(req.body, userProduct);
        this.usersProductsService
          .deleteProduct(userProduct)
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
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  addProduct(@Req() req, @Res() res) {
    if (req.body?.productId) {
      const jwtData = this.jwtTokenService.decode(
        req.headers['authorization'].split(' ')[1],
      );
      if (typeof jwtData === 'object') {
        req.body.userId = jwtData.id;
        const userProduct = new UserProducts();
        createUserProductObject(req.body, userProduct);
        this.usersProductsService
          .addProduct(userProduct)
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
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUserProducts(@Param() params, @Res() res) {
    return this.usersProductsService.getUserProducts(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user products',
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addUserProduct(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userProduct = new UserProducts();
    createUserProductObject(req.body, userProduct);
    this.usersProductsService
      .addProduct(userProduct)
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

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUserProduct(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    const userProduct = new UserProducts();
    createUserProductObject(req.body, userProduct);
    this.usersProductsService
      .deleteProduct(userProduct)
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
