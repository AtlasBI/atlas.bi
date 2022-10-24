import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import { RootModule } from './Root/root.module';

async function bootstrap() {
  const root = await NestFactory.create(RootModule);
  root.enableCors();
  await root.listen(3000);

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(80);
}
bootstrap();
