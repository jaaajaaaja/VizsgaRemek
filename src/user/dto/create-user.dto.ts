import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import sanitizeHtml from 'sanitize-html';

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
    @MinLength(8)
    password:string
}