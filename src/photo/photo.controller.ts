import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { PhotoService } from './photo.service';
import { FileValidationPipe } from 'src/common/validators/file-validation.pipe';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import type { Response as Res } from 'express';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService) { }

    @Get()
    async getAll() {
        return this.photoService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id: string, @Response() response: Res) {
        const res = await this.photoService.getOne(Number(id))
        return response.set({ "Content-Type": res?.type }).send(res?.data);
    }

    /*
    TODO: mukodjon 

    @Get('/getAllByUser/:userID')
    async getAllByUser(@Param('userID') userID: string, @Response() response: Res) {
        const res = await this.photoService.getAllByUser(Number(userID))

        if (res.length === 0) {
            return { "message": "Még nem töltött fel képet" }
        }

        const photosBase64 = res.map(p => ({
            id: p.id,
            type: p.type,
            data: Buffer.from(p.data).toString('base64'),
            userID: p.userID
        }))

        return photosBase64

        //res.forEach(e => {
            //return response.set({ "Content-Type": e?.type }).send(e?.data);
        //});
        //return response.set({ "Content-Type": res?.type }).send(res?.data);

    }

    @Get('/getAllByPlace/:placeID')
    async getAllByPlace(@Param('placeID') placeID: string, @Response() response: Res) {
        const res = await this.photoService.getAllByPlace(Number(placeID))

        if (res.length === 0) {
            return { "message": "Még nem töltött fel képet egy felhasználó sem." }
        }

        const photosBase64 = res.map(p => ({
            id: p.id,
            type: p.type,
            data: Buffer.from(p.data).toString('base64'),
            userID: p.userID
        }))
        return photosBase64

        // http://localhost:3000/photo/getAllByPlace/1

        // res.forEach(e => {
        //     return response.set({ "Content-Type": e?.type }).send(e?.data);
        // });
        //return response.set({ "Content-Type": res?.type }).send(res?.data);

    }
    */

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.photoService.remove(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdatePhotoDto) {
        this.photoService.increaseMaxAllowedPacket();

        return this.photoService.update(Number(id), data)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadFile(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
        @Body('userID') userID: string, @Body('placeID') placeID: string) {

        this.photoService.increaseMaxAllowedPacket();

        return this.photoService.add({
            data: file.buffer,             //new Uint8Array()
            type: file.mimetype,
            userID: Number(userID),
            placeID: Number(placeID)
        })
    }
}
