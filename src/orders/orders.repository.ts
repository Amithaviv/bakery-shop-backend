import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  findByCustomer(customer_Id: number) {
    return this.find({
      where: [{ customerId: customer_Id }],
    });
  }
}
