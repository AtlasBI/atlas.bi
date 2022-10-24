import { IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '../../schemas/user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  readonly role: Role;
}
