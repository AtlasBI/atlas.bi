import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class RefreshJWTGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { refresh_token, username } = request.body;

    if (!refresh_token) {
      throw new UnauthorizedException('Refresh Token Invalid!');
    }

    if (!username) {
      throw new UnauthorizedException('Username Invalid!');
    }

    const user = this.userService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('User not Find');
    }

    return true;
  }
}
