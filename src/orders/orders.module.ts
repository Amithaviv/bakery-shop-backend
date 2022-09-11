import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [CustomerModule, TypeOrmModule.forFeature([OrdersRepository])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
