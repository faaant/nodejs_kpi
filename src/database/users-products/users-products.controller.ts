import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersProductsService } from '@users-products/users-products.service';

@Controller('list/products')
export class UsersProductsController {
  constructor(private usersProductsService: UsersProductsService) {}

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

  @Get()
  getProducts(@Req() req, @Res() res) {
    return this.usersProductsService
      .getUserProducts(req.body?.id)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch(() => {
        return res.status(500).json({
          message: 'Fail to get products',
        });
      });
  }

  @Delete()
  deleteProduct(@Req() req, @Res() res) {
    this.usersProductsService
      .deleteProduct(req.body)
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

  @Post()
  addProduct(@Req() req, @Res() res) {
    this.usersProductsService
      .addProduct(req.body)
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

  @Get(':id')
  getUserProducts(@Param() params, @Res() res) {
    return this.usersProductsService.getUserProducts(params.id).catch(() => {
      return res.status(500).json({
        message: 'Fail to get user products',
      });
    });
  }

  @Post(':id')
  addUserProduct(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    this.usersProductsService
      .addProduct(req.body)
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

  @Delete(':id')
  deleteUserProduct(@Param() params, @Req() req, @Res() res) {
    req.body.userId = params.id;
    this.usersProductsService
      .deleteProduct(req.body)
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
