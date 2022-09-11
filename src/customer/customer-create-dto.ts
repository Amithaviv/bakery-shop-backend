import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CustomerCreateDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'Name should be provided' })
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsDateString()
  dob: Date;
}
