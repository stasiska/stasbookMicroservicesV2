import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { SocialService } from "./social.service";
import { AuthGuard } from "src/guards/auth.guard";
import { Authorized } from "src/auth2/decorators/authorized.decorator";
import { ApiOperation } from "@nestjs/swagger";

@Controller('social-service')
export class SocialController {
    constructor(private readonly socialService: SocialService) { }

    @ApiOperation({
        summary: 'Получение друзей по id пользователя',
        description: 'Получение друзей по id пользователя.'
    })
    @UseGuards(AuthGuard)
    @Get('getFriendsById')
    async getUsersById(@Authorized('id') userId: string,) {
        return this.socialService.getFriendsById(userId)
    }

    @ApiOperation({
        summary: 'Добавление в друзья',
        description: 'Добавление в друзья.'
    })
    @UseGuards(AuthGuard)
    @Post('addFriend')
    async addFriend(@Authorized('id') userId: string,
        @Body() dto: any) {
        return this.socialService.addFriend(userId, dto.targetId)
    }
    
    @ApiOperation({
        summary: 'Если хочешь увидеть hello',
        description: 'Если хочешь увидеть hello.'
    })
    @Get() 
    async hello() {
        return {message: 'hello'}
    }
}