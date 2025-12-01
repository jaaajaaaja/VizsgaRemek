import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import sanitizeHtml from 'sanitize-html'

export class CreatePlaceDto {
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    googleplaceID:string

    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    name:string

    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    address:string
}