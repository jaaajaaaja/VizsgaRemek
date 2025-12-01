import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private prismaService: PrismaService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() body: Record<string, any>) {
        const salt = await bcrypt.genSalt(20);
        const hashedPass = await bcrypt.hash(body.password, salt);

        return this.authService.signIn(body.username, hashedPass);
    }
}
