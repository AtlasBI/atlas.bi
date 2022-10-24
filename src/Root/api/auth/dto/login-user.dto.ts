import { IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../../schemas/user.schema';

export class LoginUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  readonly role: Role;
}
