import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}

    @Get()
    async getAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.userService.findOne(Number(id))
    }

    @Post()
    async add(@Body() body:CreateUserDto) {
        return this.userService.add(body)
    }

    @Delete(':id')
    async remove(@Param('id') id:string) {
        return this.userService.remove(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:UpdateUserDto) {
        return this.userService.update(Number(id), body)
    }
}
