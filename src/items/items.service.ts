import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ItemDto } from './dto/create-item.dto';
import { Item } from './entities/item.entity';
import { ItemRepository } from './item.repository';
@Injectable()
export class ItemsService {
  constructor(private itemRipo: ItemRepository) {}

  async add(newItem: ItemDto): Promise<Item> {
    console.log(newItem);
    const customer = this.itemRipo.create([{ ...newItem }]);
    if (customer.length) {
      return this.itemRipo.save(customer[0]);
    }
    throw new HttpException('lala', HttpStatus.INTERNAL_SERVER_ERROR);
    //this._customers.push(newCustomer);
  }

  getItems(): Promise<Item[]> {
    return this.itemRipo.find();
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
