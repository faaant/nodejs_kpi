import { Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Post()
    createProduct(@Req() request: Request) {
        return `This action create a product`;
    }

    @Put(':id')
    updateProduct(@Param() params, @Req() request: Request): string {
        console.log(params.id);
        return `This action update a #${params.id} product`;
    }

    @Delete(':id')
    deleteProduct(@Param() params): string {
        console.log(params.id);
        return `This action delete a #${params.id} product`;
    }
}
