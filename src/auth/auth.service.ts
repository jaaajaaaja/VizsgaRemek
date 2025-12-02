import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)        
        if (!user) {
            throw new UnauthorizedException('No user found')
        }

        const passwordMatch = await bcrypt.compare(pass, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials')
        }

        // const { password, ...result } = user 
        //proba commit

        const payload = { sub: user.id, username:user.userName }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }

        //return result
    }
}
