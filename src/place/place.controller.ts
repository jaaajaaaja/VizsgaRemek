import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('place')
export class PlaceController {
    constructor(private placeService:PlaceService) {}

    @Get()
    async getAll() {
        return this.placeService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id:string) {
        return this.placeService.getOne(Number(id))
    }

    @Post()
    async add(@Body() body:CreatePlaceDto) {
        return this.placeService.add(body)
    }

    @Delete(':id')
    async remove(@Param('id') id:string) {
        return this.placeService.remove(Number(id))
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() body:UpdatePlaceDto) {
        return this.placeService.update(Number(id), body)
    }
}
