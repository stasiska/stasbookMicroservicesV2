import { IsEmail, IsNotEmpty, isString, IsString, MinLength, Validate } from "class-validator";
import { IsPasswordsMatchingConstraint } from "../../libs/common/is-password-mathching-constraint.decorator";
import { ApiProperty } from "@nestjs/swagger";
export class RegisterDto {

    @ApiProperty({
        description: 'Имя пользователя',
        example: 'Иван Иванов'
    })
    @IsString({message: 'Имя долно быть строкой.'})
    @IsNotEmpty({message: 'Имя обязательно для заполнения.'})
    name: string

    @ApiProperty({
        description: 'Email пользователя',
        example: 'stas@gmail.com'
    })
    @IsString({message: 'Имя долно быть строкой.'})
    @IsEmail({}, {message: `Некорректный формат email.`})
    email: string
    
    @ApiProperty({
        description: 'Пароль пользователя',
        example: '1234567'
    })
    @IsString({message: 'Пароль должен быть строкой.'})
    @IsNotEmpty({message: 'Пароль обязателен для заполнения.' })
    @MinLength(6, {
        message: 'Пароль должен содержать минимум 6 символов.'
    })
    password: string

    @ApiProperty({
        description: 'Повторите пароль пользователя',
        example: '1234567'
    })
    @IsString({message: 'Пароль должен быть строкой.'})
    @IsNotEmpty({message: 'Пароль обязателен для заполнения.' })
    @MinLength(6, {
        message: 'Пароль должен содержать минимум 6 символов.'
    })
    @Validate(IsPasswordsMatchingConstraint, {
        message: 'Пароли не совпадают.'
    })
    passwordRepeat: string
}