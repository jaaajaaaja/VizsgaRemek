import { Transform, TransformFnParams } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator"
import * as sanitizeHtml from 'sanitize-html';

export class UpdateCommentDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Min(1)
    @Max(200)
    @Transform((params: TransformFnParams) => sanitizeHtml(params.value))
    commentText:string

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating:number
}