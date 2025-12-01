import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany()
    }

    async findOne(userName: string) {
        return this.prisma.user.findUnique({ where: { userName } })
    }

    async add(data: CreateUserDto) {
        return this.prisma.user.create({ data })
    }

    async remove(id: number) {
        return this.prisma.user.delete({ where: { id } })
    }

    async update(id: number, data: UpdateUserDto) {
        return this.prisma.user.update({ where: { id }, data })
    }
}
