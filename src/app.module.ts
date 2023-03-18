import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { MongooseModule } from '@nestjs/mongoose';
import conn from './config/keys';
import { itemsModule } from './items/items.module';
@Module({
  imports: [itemsModule, MongooseModule.forRoot(conn.mongoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
