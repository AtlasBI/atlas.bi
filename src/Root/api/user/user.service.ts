import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userModel.collection.findOne({
      username: loginUserDto.username,
    });

    return (user as User) || null;
  }

  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    const checkUser = await this.userModel.collection.findOne({
      username: createUserDto.username,
    });

    if (checkUser) {
      return null;
    }

    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({
      username: username,
    });
  }
}
