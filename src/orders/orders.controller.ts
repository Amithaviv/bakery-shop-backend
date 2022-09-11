import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Session,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { identity } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('addCart')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('getCart')
  findAll(@Session() session: Record<string, any>) {
    return this.ordersService.findAll(session);
  }
  //UnUsed
  @Get('getOrders')
  findOrders(@Session() session: Record<string, any>) {
    return this.ordersService.findOrders(session);
  }

  @Get(':id')
  findOrder(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    return this.ordersService.findOne(+id);
  }

  @Get('order/:id')
  findOrderNotNull(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    return this.ordersService.findOneNotNull(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: number,
  ) {
    return this.ordersService.remove(+id);
  }
}
