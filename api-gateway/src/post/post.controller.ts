import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Query, Req, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "../guards/auth.guard";
import { Authorized } from "../auth2/decorators/authorized.decorator";
import { CreatePostDto } from "./dto/createPostDto";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CommentPostDto, LikePostDto, PostDto } from "./types/types";

@Controller('post-service')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @ApiOperation({
        summary: 'Создание поста',
        description: 'Создание поста.'
    })
    @ApiBody({
        description: 'Создание поста с файлом. Пользоыватель должен быть авторизован.',
        required: true,
        type: CreatePostDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Пост успешно создан',
        type: PostDto,
    })
    @UseGuards(AuthGuard)
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async createPost(@UploadedFile() file,
        @Authorized('id') userId: string,
        @Body() dto: CreatePostDto
    ) {
        return this.postService.createPost(file, userId, dto)

    }

    @ApiOperation({
        summary: 'Получение поста по id',
        description: 'Получение поста по id.'
    })
    @ApiResponse({
        status: 200,
        description: 'Пост успешно получен',
        type: PostDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Пост не найден',
    })
    @Get(':id')
    async getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id)
    }

    @ApiOperation({
        summary: 'Получение постов по id пользователя',
        description: 'Получение постов по id пользователя.'
    })
    @ApiResponse({
        status: 200,
        description: 'Посты успешно получены',
        type: PostDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Пользователь не найдены',
    })
    @Get('user/:id')
    async getPostsByUserId(@Param('id') id: string) {
        return this.postService.getPostsByUserId(id)
    }

    @ApiOperation({
        summary: 'Поставить лайк на пост или убрать лайк с поста',
        description: 'поставить лайк на пост или убрать лайк с поста.'
    })
    @ApiBody({
        description: 'Пост с файлом. Пользователь должен быть авторизован.',
        required: true,
        type: LikePostDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Лайк успешно поставлен или убран',
        type: PostDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Пост не найден',
    })
    @UseGuards(AuthGuard)
    @Post('doLike')
    async doLike(
        @Body() dto: LikePostDto,
        @Authorized('id') userId: string,
    ) {
        return this.postService.likePost(dto.postId, userId)
    }

    @ApiOperation({
        summary: 'Добавить комментарий к посту',
        description: 'Добавить комментарий к посту.'
    })
    @ApiBody({
        description: 'Пост с файлом. Пользователь должен быть авторизован.',
        required: true,
        type: CommentPostDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Комментарий успешно добавлен',
        type: PostDto,
    })
    @ApiResponse({
        status: 400,
        description: 'Пост не найден',
    })
    @UseGuards(AuthGuard)
    @Post('comment')
    async addComment(@Body() dto: any,
        @Authorized('id') userId: string
    ) {
        return this.postService.commentPost(userId, dto);
    }

    @ApiOperation({
        summary: 'Получение всех постов',
        description: 'Получение всех постов.'
    })
    @ApiResponse({
        status: 200,
        description: 'Посты успешно получены',
        type: PostDto,
    })
    @Get()
    async getAllPosts(@Query('limit') limit?: number,
        @Query('page') page?: number,
    ) {
        return this.postService.getAllPosts(page, limit)
    }
}