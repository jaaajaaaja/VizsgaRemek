import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';


@Injectable()
export class FileValidationPipe implements PipeTransform<Express.Multer.File> {
  private allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
  private maxSize = 5 * 1024 * 1024; // 5MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Validate MIME type
    if (!this.allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${this.allowedTypes.join(', ')}`
      );
    }

    // Validate size
    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File too large. Max size is ${this.maxSize / 1024 / 1024}MB`
      );
    }

    return file;
  }
}
