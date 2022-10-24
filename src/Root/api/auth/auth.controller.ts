import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginGuard } from './guards/login.guard';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import { RegistrationGuard } from './guards/registration.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.userService.login(loginUserDto);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user._id as string,
    );

    res.statusCode = HttpStatus.OK;
    return res.send({
      ...access,
      ...refresh,
      username: user.username,
      role: 'Admin',
      user: user,
    });
  }

  @UseGuards(RegistrationGuard)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.userService.registration(createUserDto);

    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = this.authService.verifyToken(
      refreshTokenDto.refresh_token,
    );
    const user = await this.userService.findOne(refreshTokenDto.username);
    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      if (validToken.error === 'jwt expired') {
        const refresh = this.authService.generateRefreshToken(
          user._id as string,
        );

        res.statusCode = HttpStatus.OK;
        return res.send({ ...access, ...refresh });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken.error });
      }
    }

    res.statusCode = HttpStatus.OK;
    return res.send({
      ...access,
      refresh_token: refreshTokenDto.refresh_token,
    });
  }
}
