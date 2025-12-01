import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import sanitizeHtml from 'sanitize-html';

export class UpdatePlaceDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    googleplaceID:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    name:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    address:string
}