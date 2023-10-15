import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UsersModule, 
    MongooseModule.forRoot('mongodb+srv://sgmagic:My_Mongo_89@cluster0.gtjqwjc.mongodb.net/?retryWrites=true&w=majority',
      {  }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('mongodb.database.connectionString'),
        dbName: config.get<string>('mongodb.database.databaseName')
      })
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('api.apiUrl'),
        timeout: configService.get<number>('api.httpTimeout')
      }),
      inject: [ConfigService]
    })
    ],
      
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
