import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
    @ApiProperty({
        description: 'ID поста',
        example: '1'
    })
    id: string;
    @ApiProperty({
        description: 'Контент поста',
        example: 'Hello, world!'
    })
    content: string;
    @ApiProperty({
        description: 'Медиа поста',
        example: []
    })
    media: [];
    @ApiProperty({
        description: 'ID автора поста',
        example: '1'
    })
    authorId: string;
    @ApiProperty({
        description: 'создан пост',
        example: '2023-10-01T12:00:00Z'
    })
    createdAt: string;
    @ApiProperty({
        description: 'обновлен пост',
        example: '2023-10-01T12:00:00Z'
    })
    updatedAt: string;
    @ApiProperty({
        description: 'Лайки поста',
        example: []
    })
    likes: [];
    @ApiProperty({
        description: 'Комментарии поста',
        example: []
    })
    comments: Comment[];
}


export class LikePostDto {
    @ApiProperty({
        description: 'ID поста',
        example: '1'
    })
    postId: string;

}

export class CommentPostDto {
    @ApiProperty({
        description: 'ID поста',
        example: '1'
    })
    postId: string;
    @ApiProperty({
        description: 'Текст комментария',
        example: 'Hello, world!'
    })
    text: string;
}