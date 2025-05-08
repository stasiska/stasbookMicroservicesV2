import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {

    @ApiProperty({
        description: 'введите ваш email',
        example: 'stas@gmail.com'
    })
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({}, {message: 'Некодлрректный формат email'})
    @IsNotEmpty({message: 'Email обязателен для заполнения'})
    email: string
    

    @ApiProperty({
        description: 'введите ваш пароль',
        example: '1234567'
    })
    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({message: 'Пароль обязателен для заполнения'})
    @MinLength(6, {message: 'Пароль должен содержать не менее 6 символов.'})
    password: string

    @ApiProperty({
        description: 'введите ваш код подтверждения если есть двухфакторная аутентификация',
        example: '1234567'
    })
    @IsOptional()
    @IsString()
    code: string
}