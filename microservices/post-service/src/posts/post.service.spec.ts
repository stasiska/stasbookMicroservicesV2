import { CreatePostDto, Post, Posts } from "src/interface/post_service";
import { PostsService } from "./posts.service";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";

const mockPostData = {
  id: "10e45819-7f4d-482e-935a-c7e22fd51606",
  content: "stas noob in IT shok",
  authorId: "0da529cb-5022-4766-aaf4-69eec50e0fb6",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  media: [],
  likes: [],
  comments: []
};

const mockPosts: Post[] = [
  mockPostData,
  {
    ...mockPostData,
    id: "10e4s5819-7f4d-482e-935a-c7e22fd51606"
  }
];

const mockPostsResponse: Posts = {
  posts: mockPosts
};

const mockPost: Post = mockPostData;

const dto: CreatePostDto = {
  content: 'post.content',
  mediaUrl: "hfsdkfh",
  mediaType: "string",
  authorId: 'string',
};

describe("Posts Service", () => {
  let service: PostsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService, 
        {
          provide: PrismaService,
          useValue: {
            post: {
              findMany: jest.fn().mockResolvedValue(mockPosts),
              findUnique: jest.fn().mockResolvedValue(mockPost),
              create: jest.fn().mockResolvedValue(mockPost),
            }
          }
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of posts', async () => {
    const result = await service.getAllPosts({page: 0, size: 5});
    expect(result).toEqual(mockPostsResponse);
  });

  it('should return a single post by id', async () => {
    const result = await service.getPostById({postId: '10e45sd819-7f4d-482e-935a-c7e22fd51606'});
    expect(result).toEqual(mockPost);
  });

  it('should create a new post', async () => {
    const result = await service.createPost(dto);
    expect(result).toEqual(mockPost);
  });
});