import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePhotoDto {
    data:Buffer
    
    type:string

    @IsNotEmpty()
    @IsNumber()
    userID:number

    @IsNotEmpty()
    @IsNumber()
    placeID:number
}