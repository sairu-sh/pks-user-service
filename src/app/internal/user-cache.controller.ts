import { Body, Controller, Delete, Get, Injectable, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role, User } from 'src/common/decorators';
import { log } from 'console';
import { RedisClientService } from 'src/common/redisclient/redis-client.service';
import { UserService } from '../../app/user/user.service';

@ApiTags('User Cache')
@Controller('user/cache')
@Injectable()
export class UserCacheController {
    constructor(private readonly userService: UserService) {}

    @Post('invalidate')
    async invalidateUserCache(@Body() idpUserId: string) {
        await this.userService.invalidateUserCache(idpUserId);
        return { message: 'Value set successfully' };
    }
}
