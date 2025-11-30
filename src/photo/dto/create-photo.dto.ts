import { IsNotEmpty, IsNumber } from "class-validator";
import { isUint8Array } from "util/types";

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