import { EntityRepository, IsNull, Not, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  findByCustomer(customer_Id: number) {
    return this.find({
      where: [{ customerId: customer_Id, orderDate: null }],
    });
  }
  findByCustomerWithDate(customer_Id: number) {
    return this.find({
      where: [{ customerId: customer_Id, orderDate: Not(IsNull()) }],
    });
  }
  removeCartNullByCustomer(customer_Id: number) {
    return this.find({
      where: [{ customerId: customer_Id, orderDate: null }],
    });
  }
}
