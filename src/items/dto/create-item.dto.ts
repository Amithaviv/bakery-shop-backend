import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
} from 'class-validator';

export class ItemDto {
  @IsOptional()
  @IsNumber()
  id: number;
}
