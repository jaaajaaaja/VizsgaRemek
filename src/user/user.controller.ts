import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAll() {
        return this.userService.findAll()
    }

    @Get(':username')
    async getOne(@Param('username') username: string) {
        return this.userService.findOne(username)
    }

    @Post()
    async add(@Body() body: CreateUserDto) {
        const salt = await bcrypt.genSalt(20);
        const hash = await bcrypt.hash(body.password, salt);

        return this.userService.add({
            userName: body.userName,
            email: body.email,
            password: hash
        })
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(Number(id), body)
    }
}
