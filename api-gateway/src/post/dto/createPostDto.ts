import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        description: 'Заголовок поста',
        example: 'Заголовок поста',
        required: true,
        type: String,
    })
    @IsOptional() 
    @IsString({message: 'Email должен быть строкой'})
    content: string
}