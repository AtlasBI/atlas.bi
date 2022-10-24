import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum SettingType {
  TEXT = 'text',
  BOOLEAN = 'boolean',
}

export enum SettingGroup {
  GENERAL = 'general',
  SYSTEM = 'system',
}

export type SettingDocument = Setting & Document;

@Schema()
export class Setting {
  @Prop({ required: true, index: true, unique: true })
  key: string;

  @Prop({ default: '' })
  text_value: string;

  @Prop({ default: false })
  boolean_value: boolean;

  @Prop({
    index: true,
    type: String,
    enum: Object.values(SettingType),
    default: SettingType.TEXT,
  })
  type: SettingType;

  @Prop({
    index: true,
    type: String,
    enum: Object.values(SettingGroup),
    default: SettingGroup.GENERAL,
  })
  group: SettingGroup;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
