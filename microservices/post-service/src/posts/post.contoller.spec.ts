import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from "./posts-grpc.controller";
import { PostsService } from "./posts.service";
import { RpcException } from "@nestjs/microservices";

const dto = {
    content: "string",
    mediaUrl: 'string',
    mediaType: 'string',
    authorId: 'string',
};

const post = {
    id: "10e45819-7f4d-482e-935a-c7e22fd51606",
    content: "stas noob in IT shok",
    media: [
        {
            id: "64ef1d7f-2438-40d7-b5ad-311493a26c9a",
            url: "https://93fbb5a1-b913-4da9-be65-0d89ca844a02.selstorage.ru1744127779944-10619_b.png",
            type: "IMAGE"
        }
    ],
    authorId: "0da529cb-5022-4766-aaf4-69eec50e0fb6",
    createdAt: "2025-04-08T15:56:19.981Z",
    updatedAt: "2025-04-08T15:56:19.981Z"
};

describe('Post Controller', () => {
    let controller: PostsController;
    let service: PostsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostsController],
            providers: [{
                provide: PostsService,
                useValue: {
                    getAllPosts: jest.fn().mockResolvedValue({ posts: [post] }),
                    getPostById: jest.fn().mockResolvedValue(post),
                    createPost: jest.fn().mockResolvedValue(post),
                },
            }],
        }).compile();

        controller = module.get<PostsController>(PostsController);
        service = module.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return object with array of posts', async () => {
        const result = await controller.getAllPosts({ page: 1, size: 4 });
        expect(result).toEqual({ posts: [post] });
    });

    it('should return a single post by id', async () => {
        const result = await controller.getPostById({ postId: "10e45819-7f4d-482e-935a-c7e22fd51606" });
        expect(result).toEqual(post);
    });

    it('should throw an exception if post not found', async () => {
        jest.spyOn(service, 'getPostById')
            .mockRejectedValueOnce(new RpcException('Post not found'));
        
        await expect(controller.getPostById({ postId: '12343' }))
            .rejects.toThrow(RpcException);
    });

    it('should create a new post', async () => {
        const res = await controller.createPost(dto);
        expect(res).toEqual(post);
    });
});