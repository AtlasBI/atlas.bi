import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
// import { RootController } from './root.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', '..', 'distRoot'),
    }),
    ApiModule,
    AdminModule,
  ],
  // controllers: [RootController]
})
export class RootModule {}
