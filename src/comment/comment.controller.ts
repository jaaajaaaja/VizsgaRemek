import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private commentService:CommentService) {}

    @Get()
    async getAll() {
        return this.commentService.findAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.commentService.findOne(Number(id))
    }

    @Post()
    async add(@Body() body:CreateCommentDto) {
        return this.commentService.add(body)
    }

    @Delete(':id')
    async delete(id:string) {
        return this.commentService.remove(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:UpdateCommentDto) {
        return this.commentService.update(Number(id), body)
    }
}
