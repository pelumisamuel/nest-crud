import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ItemDocument, Item } from './schemas/item.schema';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}
  // private readonly items: Item[] = [
  //   {
  //     description: 'house of the rising sun',
  //     qty: 34,
  //     name: 'home',
  //   },
  // ];
  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }
  async findOne(id: string): Promise<Item> {
    const item = this.itemModel.findById(id);
    // const item = this.items.find((item, index) => item.id === id);
    return item;
  }
  async createItem(body: Item): Promise<Item> {
    return this.itemModel.create(body);
  }
  async deleteItem(id: string): Promise<{}> {
    return this.itemModel.deleteOne({ id });
  }
  async update(id: string, body: Item) {
    return this.itemModel.findByIdAndUpdate(id, body, { new: true });
  }
}
