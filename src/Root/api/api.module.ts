import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiController } from './api.controller';
import { MongooseConfigService } from './config/MongooseConfigService';
import config from './config/env.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [config],
    }),
    UserModule,
    AuthModule,
    SettingsModule,
  ],
  controllers: [ApiController],
})
export class ApiModule {}
