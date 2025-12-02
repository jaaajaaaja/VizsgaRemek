import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt'
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() body: Record<string, any>) {
        const salt = await bcrypt.genSalt(20)
        const hashedPass = await bcrypt.hash(body.password, salt)

        return this.authService.signIn(body.username, hashedPass)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
