import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post('addItem')
  @UsePipes(new ValidationPipe())
  create(@Body() newItem: ItemDto) {
    return this.itemsService.add(newItem);
  }
  @Get('getItems')
  getAll() {
    const items = this.itemsService.getItems();
    return items;
  }
  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
