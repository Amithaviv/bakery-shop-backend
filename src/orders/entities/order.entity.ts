// eslint-disable-next-line prettier/prettier
import { IsOptional, Max, Min } from "class-validator";
import { Customer } from 'src/customer/customer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(1)
  @Max(1000)
  price: number;

  @Column()
  @Min(1)
  @Max(50)
  quantity: number;

  @Column()
  productName: string;

  @Column({ nullable: true })
  @IsOptional()
  orderDate: Date;

  @Column()
  customerId: number;
  @ManyToOne(() => Customer, (cust) => cust.orders)
  customer: Customer;
}
