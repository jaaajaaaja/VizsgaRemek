import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Injectable()
export class PhotoService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.photo.findMany()
    }

    async getOne(id: number) {
        return this.prisma.photo.findUnique({ where: { id } })
    }

    async add(data: CreatePhotoDto) {
        // return this.prisma.photo.create({ data })

        const buffer = Buffer.isBuffer(data.data) ? data.data : Buffer.from(data.data as any)
        const createPayload = {
            data: buffer,
            type: data.type,
            userID: data.userID,
            placeID: data.placeID,
        }

        return this.prisma.photo.create({ data: createPayload })
    }

    async remove(id: number) {
        return this.prisma.photo.delete({ where: { id } })
    }

    async update(id: number, data: UpdatePhotoDto) {
        //return this.prisma.photo.update({ where: {id}, data })

        const buffer = Buffer.isBuffer(data.data) ? data.data : Buffer.from(data.data as any)
        const createPayload = {
            data: buffer,
            type: data.type,
            userID: data.userID,
            placeID: data.placeID,
        }

        return this.prisma.photo.update({ where: { id }, data: createPayload })
    }

    async increaseMaxAllowedPacket() {
        const size = 10 * 1024 * 1024; // 10 MB

        await this.prisma.$executeRawUnsafe(
            `SET GLOBAL max_allowed_packet = ${size};`
        );

        return 'max_allowed_packet updated';
    }
}
