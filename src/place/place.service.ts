import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlaceService {
    constructor(private prisma:PrismaService) {}

    async getAll() {
        return this.prisma.place.findMany()
    }

    async getOne(id:number) {
        return this.prisma.place.findUnique({ where: {id} })
    }

    async add(data:CreatePlaceDto) {
        return this.prisma.place.create({ data })
    }

    async remove(id:number) {
        return this.prisma.place.delete({ where: {id} })
    }

    async update(id:number, data:UpdatePlaceDto) {
        return this.prisma.place.update({ where: {id}, data })
    }
}
