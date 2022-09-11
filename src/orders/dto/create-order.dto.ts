import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(1000)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @Min(1)
  @Max(50)
  quantity: number;

  productName: string;

  orderDate: Date;
}
