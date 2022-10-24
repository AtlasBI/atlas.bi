import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { AuthService } from '../auth/auth.service';
import { JWTGuard } from '../auth/guards/jwt.guard';

@Controller('settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req, @Res() res) {
    const token = req.token;

    const responseData = {
      // Get USER by token
      user: await this.authService.getUserByTokenData(token),
      data: await this.settingsService.findAll(),
    };

    return res.send(responseData);
  }

  @Get(':key')
  async findOne(@Param('key') key: string) {
    return await this.settingsService.findOne(key);
  }

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createSettingDto: CreateSettingDto) {
    return await this.settingsService.create(createSettingDto);
  }

  @UseGuards(JWTGuard)
  @Patch(':key')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('key') key: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return await this.settingsService.update(key, updateSettingDto);
  }

  @Delete(':key')
  async remove(@Param('key') key: string) {
    return await this.settingsService.remove(key);
  }
}
