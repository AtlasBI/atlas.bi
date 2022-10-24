import { IsNotEmpty, IsOptional } from 'class-validator';
import { SettingGroup, SettingType } from '../../schemas/setting.schema';

export class CreateSettingDto {
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
