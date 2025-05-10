import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { RegisterDto } from "./dto/register.dto";
import { ConfirmationDto } from "./dto/email-confirmation.dto";
import { AuthGuard } from "../guards/auth.guard";
import { Authorized } from "./decorators/authorized.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { LoginDto } from "./dto/login.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { NewPasswordDto } from "./dto/new-password.dto";
import { UserDto } from "./types/types";

@Controller('auth-service')
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }


    @ApiOperation({
        description: 'Получение пользователя по id.',
    })
    @ApiResponse({
        status: 200,
        description: 'вывод пользователя по id',
        type: UserDto
    })
    @Get('user/:id')
    async getUserById(@Param('id') id: string) {
        const user = await this.authService.getUserById(id)
        return user
    }

    @ApiOperation({
        summary: 'Авторизация пользователя',
        description: 'Авторизация пользователя.',
    })
    @ApiBody({
        description: 'Авторизация пользователя',
        type: LoginDto,
        required: true
    })
    @Post('login')
    async login(@Body() dto: LoginDto, @Req() req: Request) {
        return this.authService.login(dto, req)
    }

    @ApiOperation({
        summary: 'Выход пользователя из системы',
        description: 'Выход пользователя и закрытие сессии.',
    })
    @ApiResponse({
        status: 200,
        description: 'Выход пользователя и закрытие сессии.',
        example: {
            message: 'Вы вышли из системы'
        }
    })
    @Post("logout")
    async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this.authService.logout(req, res)
    }

    @ApiOperation({
        summary: 'Регистрация пользователя',
        description: 'Регистрация пользователя с отправкой письма на почту для подтверждения регистрации.'
    })
    @ApiBody({
        description: 'Регистрация пользователя',
        type: RegisterDto,
        required: true
    })
    @ApiResponse({
        status: 201,
        description: 'На ваш адрес электронной почты было отправлено письмо с подтверждением регистрации.',
        type: RegisterDto
    })
    @Post('registration')
    async registration(@Body() dto: RegisterDto) {
        return this.authService.registration(dto)
    }

    @ApiOperation({
        summary: 'Отправка повторного письма для подтверждения регистрации',
        description: 'Отправка повторного письма для подтверждения регистрации.',
    })
    @ApiResponse({
        status: 200,
        description: 'Подтверждение регистрации пользователя.',
        type: ConfirmationDto
    })
    @ApiBody({
        description: 'Подтверждение регистрации пользователя',
        type: ConfirmationDto,
        required: true
    })
    @Post('email-confirmation')
    async emailConfirmation(@Req() req: Request, @Body() dto: ConfirmationDto) {
        return this.authService.emailConfirmation(req, dto)
    }


    @ApiOperation({
        summary: 'Регистрация через Oauth2',
        description: 'Регистрация через Oauth2.',
    })
    @ApiResponse({
        status: 200,
        description: 'Регистрация через Oauth2.',
        example: {
            redirectURL: 'https://example.com/oauth/callback'
        }
    })
    @Get('/oauth/connect/:provider')
    async connect(@Param('provider') provider: string) {
        return this.authService.connect(provider)
    }


    @ApiOperation({
        summary: 'Авторизация через Oauth2',
        description: 'Авторизация через Oauth2.',
    })
    @ApiResponse({
        status: 200,
        description: 'Авторизация через Oauth2.',

    })
    @Get('/oauth/callback/:provider')
    public async callback(
        @Req() req: Request,
        @Res() res: Response,
        @Query('code') code: string,
        @Param('provider') provider: string
    ) {
        if (!code) {
            throw new BadRequestException(`Не был предоставлен код авторизации.`)
        }
        const response = await this.authService.callback(req, provider, code, res)
        return res.redirect(response.redirectURL)
    }


    @ApiOperation({
        summary: 'Подтверждение регистрации пользователя',
        description: 'Получение информации о пользователе.',
    })
    @ApiResponse({
        status: 200,
        description: 'Получение информации о пользователе.',
    })
    @UseGuards(AuthGuard)
    @Get('profile')
    public async findProfile(@Authorized('id') userId: string) {
        return this.authService.findProfile(userId)
    }

    @ApiOperation({
        summary: 'Подтверждение регистрации пользователя',
        description: 'Изменение пароля.',
    })
    @ApiBody({
        description: 'Изменение пароля',
        type: ResetPasswordDto,
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Изменение пароля.',
    })

    @Post('password-recovery/reset')
    public async passwordReset(@Body() dto: ResetPasswordDto) {
        return this.authService.passwordReset(dto)
    }

    @ApiOperation({
        summary: 'Подтверждение нового пароля',
        description: 'Подтверждение нового пароля.',
    })
    @ApiResponse({
        status: 200,
        description: 'Подтверждение нового пароля.',
        example: {
            message: 'Пароль успешно изменен'}
    })
    @ApiBody({
        description: 'Подтверждение нового пароля',
        type: NewPasswordDto,
        required: true
    })
    @Post('password-recovery/new/:token')
    public async passwordNew(@Body() dto: NewPasswordDto, @Param('token') token: string) {
        return this.authService.passwordNew(dto, token)
    }

    @ApiOperation({
        summary: 'Загрузка файла',
        description: 'Загрузка файла.',
    })
    @ApiResponse({
        status: 200,
    })
    @ApiBody({
        description: 'Загрузка файла',
        type: 'multipart/form-data',
        required: true
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file.buffer)
    }

    @ApiOperation({
        summary: 'Удаление пользователя',
        description: 'Удаление пользователя.',
    })
    @ApiResponse({
        status: 200,
        description: 'Удаление пользователя.',
    })
    @Delete('user/:id')
    async deleteUserById(@Param('id') id: string) {
        const res = await this.authService.deleteUserById(id)
        return res
    }
}
