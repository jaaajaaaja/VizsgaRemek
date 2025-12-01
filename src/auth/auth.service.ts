import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username)        
        if (user) {
            if (!bcrypt.compare(user.password, pass)) {
                throw new UnauthorizedException()
            }
        } else {
            return 'No user found'
        }

        const { password, ...result } = user

        return result
    }
}
