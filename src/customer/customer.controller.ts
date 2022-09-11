import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Scope,
  Session,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomValidatorPipe } from 'src/validations/custom-validator.pipe';
import { CustomerDto } from './customer-dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('getCustomers')
  getAll() {
    const customers = this.customerService.getCustomers();
    return customers;
  }
  /*
  @Post('addCustomer')
  @UsePipes(new ValidationPipe())
  create(@Body() newCustomer: CustomerDto) {
    return this.customerService.add(newCustomer);
  }
  */
  @Post('registerAddCustomer')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() newCustomer: CustomerDto,
    @Session() session: Record<string, any>,
  ) {
    const registedUser = await this.customerService.registerCustomer(
      newCustomer,
    );
    if (registedUser) {
      session.userLoggedCookie = registedUser.id;
    }
    return registedUser;
  }

  @Post('login')
  async findbyUsername(
    @Body() body: { name: string; email: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    let user;
    if (body.name) {
      user = this.customerService.findByUsername(body.name);
    } else {
      user = this.customerService.findByEmail(body.email);
    }
    if ((await user)?.password == body.password) {
      session.user = user;
      return user;
    }
    throw new HttpException(body.name, HttpStatus.NOT_FOUND);
  }

  @Get(':id')
  findCustomer(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    console.log(typeof id);
    return this.customerService.find(id);
  }

  @Get('/email/:email')
  findCustomerByEmail(@Param('email') email: string) {
    console.log(typeof email);
    return this.customerService.findByEmail(email);
  }

  // @Get('orders')
  // @UsePipes(CustomValidatorPipe)
  // orders(
  //   @Query('asc', new DefaultValuePipe(true), ParseBoolPipe) asc: boolean,
  // ) {
  //   return asc;
  // }

  @Get(':id/orders')
  async customerOrders(@Param('id', ParseIntPipe) id: number) {
    const orders = await this.customerService.getOrders(id);
    return orders;
  }

  @Get('specific')
  orders(@Query('id', CustomValidatorPipe) cust: CustomerDto) {
    return cust;
  }
}
