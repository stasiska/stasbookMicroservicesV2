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

@Controller('auth-service')
export class AuthContoller {
    constructor(private readonly authService: AuthService) { }

    @ApiResponse({
        status: 200,
        description: 'вывод пользователя по id',
    })
    @ApiOperation({
        description: 'Получение пользователя по id.',
    })
    @Get('user/:id')
    async getUserById(@Param('id') id: string) {
        const user = await this.authService.getUserById(id)
        return user
    }

    @ApiOperation({
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

    @Post("logout")
    async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this.authService.logout(req, res)
    }

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
    @ApiOperation({
        summary: 'Регистрация пользователя',
        description: 'Регистрация пользователя с отправкой письма на почту для подтверждения регистрации.'
    })
    @Post('registration')
    async registration(@Body() dto: RegisterDto) {
        return this.authService.registration(dto)
    }

    @Post('email-confirmation')
    async emailConfirmation(@Req() req: Request, @Body() dto: ConfirmationDto) {
        return this.authService.emailConfirmation(req, dto)
    }

    @Get('/oauth/connect/:provider')
    async connect(@Param('provider') provider: string) {
        return this.authService.connect(provider)
    }

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

    @UseGuards(AuthGuard)
    @Get('profile')
    public async findProfile(@Authorized('id') userId: string) {
        return this.authService.findProfile(userId)
    }

    @Post('password-recovery/reset')
    public async passwordReset(@Body() dto : any) {
        return this.authService.passwordReset(dto)
    }

    @Post('password-recovery/new/:token')
    public async passwordNew(@Body() dto: any, @Param('token') token: string) {
        return this.authService.passwordNew(dto,token)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file) {
        console.log(file.buffer)
    }


    @Delete('user/:id')
    async deleteUserById(@Param('id') id: string) {
        const res = await this.authService.deleteUserById(id)
        return res
    }
}
