import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({
        description: 'Email пользователя',
        example: 'stas@gmail.com'
    })
    @IsEmail({}, {message: `Введите корректный адрес электронной почты.`})
    @IsNotEmpty({message: 'Поле Email не может быть пустым.'})
    email: string
}