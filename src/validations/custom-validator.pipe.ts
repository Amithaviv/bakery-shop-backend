import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomerDto } from 'src/customer/customer-dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class CustomValidatorPipe
  implements PipeTransform<number, Promise<CustomerDto>>
{
  constructor(private service: CustomerService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    return this.service.find(+value);
  }
}
