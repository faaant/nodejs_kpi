import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({
    message: 'Product name must be not empty',
  })
  productName?: string;

  @IsNotEmpty({
    message: 'Price name must be not empty',
  })
  @IsNumber()
  price?: number;

  @IsNotEmpty({
    message: 'Weight must be not empty',
  })
  @IsNumber()
  weight?: number;

  @IsNotEmpty({
    message: 'Count must be not empty',
  })
  @IsNumber()
  count?: number;

  @IsNotEmpty({
    message: 'CPU must be not empty',
  })
  CPU?: string;

  @IsNotEmpty({
    message: 'RAM must be not empty',
  })
  @IsNumber()
  RAM?: number;

  @IsNotEmpty({
    message: 'Resolution must be not empty',
  })
  resolution?: string;
}
