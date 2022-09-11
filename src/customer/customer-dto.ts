import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'Name should be provided' })
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
