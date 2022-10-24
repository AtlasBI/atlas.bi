import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from './config/MongooseConfigService';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'distApp'),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ApiModule,
    AdminModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
