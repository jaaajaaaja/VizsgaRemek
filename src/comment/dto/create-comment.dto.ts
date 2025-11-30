import { Transform, TransformFnParams } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import * as sanitizeHtml from 'sanitize-html';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    @Min(1)
    @Max(200)
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    commentText:string

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating:number

    @IsNotEmpty()
    @IsNumber()
    userID:number

    @IsNotEmpty()
    @IsNumber()
    placeID:number
}