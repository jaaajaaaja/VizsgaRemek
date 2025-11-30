import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { PlaceService } from './place/place.service';
import { PlaceController } from './place/place.controller';
import { PlaceModule } from './place/place.module';
import { PhotoService } from './photo/photo.service';
import { PhotoController } from './photo/photo.controller';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), PrismaModule, CommentModule, UserModule, PlaceModule, PhotoModule],
  controllers: [AppController, PlaceController, PhotoController],
  providers: [AppService, PlaceService, PhotoService],
})
export class AppModule {}