import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IAuthService } from './interfaces';
import { SignInDto } from './dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    @Post('/signin')
    async signIn(@Body() body: SignInDto) {
        return this.authService.signin(body);
    }
}
