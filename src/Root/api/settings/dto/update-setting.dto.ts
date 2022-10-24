import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SettingGroup, SettingType } from '../../schemas/setting.schema';
import { CreateSettingDto } from './create-setting.dto';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
  @IsNotEmpty()
  readonly key: string;

  @IsOptional()
  readonly text_value: string;

  @IsOptional()
  readonly boolean_value: boolean;

  @IsNotEmpty()
  readonly type: SettingType;

  @IsOptional()
  readonly group: SettingGroup;
}
