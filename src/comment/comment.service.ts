import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.comment.findMany()
    }

    async findOne(id:number) {
        return this.prisma.comment.findUnique({ where: {id} })
    }

    async add(data:CreateCommentDto) {
        return this.prisma.comment.create({ data })
    }

    async remove(id:number) {
        return this.prisma.comment.delete({ where: {id} })
    }

    async update(id:number, data:UpdateCommentDto) {
        return this.prisma.comment.update({ where: {id}, data })
    }
}
