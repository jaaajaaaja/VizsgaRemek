import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { PhotoService } from './photo.service';
import { FileValidationPipe } from 'src/common/validators/file-validation.pipe';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
    async uploadFile(@UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
        @Body('userID') userID: string, @Body('placeID') placeID: string) {
        return this.photoService.add({
            data: file.buffer,             //new Uint8Array()
            type: file.mimetype,
            userID: Number(userID),
            placeID: Number(placeID)
        })
    }
}
