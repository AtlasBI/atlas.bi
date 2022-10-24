import { IsNotEmpty, IsOptional } from 'class-validator';
import { SettingGroup, SettingType } from '../../schemas/setting.schema';

export class FilterSettingDto {
  @IsOptional()
  readonly type?: SettingType;

  @IsOptional()
  readonly group?: SettingGroup;
}
