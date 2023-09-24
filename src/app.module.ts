import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://sgmagic:My_Mongo_89@cluster0.gtjqwjc.mongodb.net/?retryWrites=true&w=majority',
  {dbName: 'nabyindb'})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
