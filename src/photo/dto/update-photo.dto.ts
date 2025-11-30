import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator"

export class UpdatePhotoDto {
    @IsOptional()
    @ValidateIf(o => o.type !== undefined)
    data:Buffer

    @IsOptional()
    @IsString()
    @ValidateIf(o => o.data !== undefined)
    type:string
    
    @IsNotEmpty()
    @IsNumber()
    userID:number
    
    @IsNotEmpty()
    @IsNumber()
    placeID:number
}