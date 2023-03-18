import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    try {
      return await this.itemsService.findAll();
    } catch (error) {
      console.log(error);
    }
  }
  @Get(':id')
  getItem(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }
  @Post()
  async create(
    @Body() createItemDto: CreateItemDto,
  ): Promise<{ status: number; item: Item }> {
    try {
      const item = await this.itemsService.createItem(createItemDto);
      return { status: 200, item };
    } catch (error) {
      console.log(error);
    }
    // return { status: 200, ...createItemDto };
  }

  @Put(':id')
  async update(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id: string,
  ): Promise<{ message: string; item: Item }> {
    const item = await this.itemsService.update(id, updateItemDto);
    return { message: 'item updated successfully', item };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): {} {
    try {
      this.itemsService.deleteItem(id);
    } catch (error) {
      console.log(error);
    }
    return { message: 'delete successuffly' };
  }
}
