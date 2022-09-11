/* eslint-disable prettier/prettier */
import { Order } from 'src/orders/entities/order.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }
  findByUsername(name: string) {
    return this.findOne({ name });
  }
  async getOrders(id: number): Promise<Order[]> {
    const customer = await this.findOne({
      where: { id },
      relations: ['orders'],
    });
    return customer.orders;
  }
}
