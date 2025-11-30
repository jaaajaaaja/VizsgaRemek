import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    userName?:string

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    email?:string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Min(8)
    passwordHash?:string
}