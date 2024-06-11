import { Controller, Get, Post, Body } from '@nestjs/common';
import { RedisClientService } from './redis-client.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/app/role/interfaces';
import { Role } from '../decorators';

ApiTags('Redis')
@Controller('redis')
export class RedisController {
  constructor(private readonly redisClientService: RedisClientService) {}

  @Post('set')
  @ApiBearerAuth()
  @Role(UserRoles.SUPER_ADMIN)
  async setValue(@Body('key') key: string, @Body('value') value: string) {
    await this.redisClientService.setValue(key, value);
    return { message: 'Value set successfully' };
  }

  @Get('get')
  @ApiBearerAuth()
  @Role(UserRoles.SUPER_ADMIN)
  async getValue(@Body('key') key: string) {
    const value = await this.redisClientService.getValue("test");
    return { key, value };
  }
}