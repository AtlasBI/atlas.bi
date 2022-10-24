import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
