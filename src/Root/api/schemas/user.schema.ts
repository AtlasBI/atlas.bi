import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, index: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    index: true,
    type: String,
    enum: Object.values(Role),
    default: Role.User,
  })
  role: Role;

  _id: mongoose.Types.ObjectId | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
