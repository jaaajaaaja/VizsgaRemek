import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    userName:string

    @IsNotEmpty()
    @IsEmail()
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    email:string

    @IsNotEmpty()
    @IsString()
    @Min(8)
    passwordHash:string
}