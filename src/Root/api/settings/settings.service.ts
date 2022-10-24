import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from '../schemas/setting.schema';
import { CreateSettingDto } from './dto/create-setting.dto';
import { FilterSettingDto } from './dto/filter-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private settingModel: Model<SettingDocument>,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<Setting | null> {
    const checkItem = await this.findOne(createSettingDto.key);
    if (checkItem) {
      return null;
    }

    const newItem = new this.settingModel(createSettingDto);
    return newItem.save();
  }

  async findAll(filter?: FilterSettingDto): Promise<Setting[]> {
    let filterData: FilterSettingDto = {};

    if (typeof filter === 'object' && Object.keys(filter).length > 0) {
      filterData = { ...filter };
    }

    return await this.settingModel.find(filterData);
  }

  async findOne(key: string): Promise<Setting | null> {
    return await this.settingModel.findOne({
      key: key,
    });
  }

  async update(
    key: string,
    updateSettingDto: UpdateSettingDto,
  ): Promise<Setting | null> {
    //** TODO: Что тут возвращает? */
    await this.settingModel.updateOne(
      { key: key },
      { $set: { ...updateSettingDto } },
    );

    return this.findOne(key);
  }

  async remove(key: string): Promise<void> {
    await this.settingModel.deleteOne({ key: key });
  }
}
