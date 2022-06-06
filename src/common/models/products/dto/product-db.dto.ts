import { ProductDto } from '@products/dto';
import { IsNotEmpty } from 'class-validator';

export class ProductDbDto extends ProductDto {
  @IsNotEmpty({
    message: 'ID must be not empty',
  })
  id?: string;
}
