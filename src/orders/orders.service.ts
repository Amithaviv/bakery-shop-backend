import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRipo: OrdersRepository,
    private customerService: CustomerService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { customerId, price, quantity, productName, orderDate } =
      createOrderDto;
    const customer = await this.customerService.find(customerId);
    const order = this.ordersRipo.create({
      price,
      customer,
      quantity,
      productName,
      orderDate,
    });
    await this.ordersRipo.save(order);
    return order;
  }
  //UnUsed
  findAll(session) {
    const userId = session.user.id;
    return this.ordersRipo.findByCustomer(userId);
  }
  //UnUsed
  findOrders(session) {
    const userId = session.user.id;
    return this.ordersRipo.findByCustomerWithDate(userId);
  }

  findOne(id: number) {
    return this.ordersRipo.findByCustomer(id);
  }

  findOneNotNull(id: number) {
    return this.ordersRipo.findByCustomerWithDate(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return this.ordersRipo.delete({ customerId: id, orderDate: null });
  }
}
