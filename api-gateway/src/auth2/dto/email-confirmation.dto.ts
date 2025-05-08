import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmationDto {
    @ApiProperty({
        description: 'Токен для подтверждения email',
        example: '1234567890'
    })
    @IsString({message: 'Токен должен быть строкой.'})
    @IsNotEmpty({message: 'Поле токен не может быть пустым.'})
    token: string
}