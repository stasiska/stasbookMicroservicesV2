import { CommentPostDto, CreatePostDto, LikePostDto, Post, Posts } from "src/interface/post_service";
import { PostsService } from "./posts.service";
import { PrismaService } from "../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CacheService } from "../libs/cacheRedis/src/cache.service";
import { SocialServiceClientService } from "../grpc-client/social-service-client.service";
import { of } from "rxjs"
const mockPostData = {
  id: "10e45819-7f4d-482e-935a-c7e22fd51606",
  content: "stas noob in IT shok",
  authorId: "0da529cb-5022-4766-aaf4-69eec50e0fb6",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  media: [],
  likes: [],
  comments: [    {
    id: 'comment-1',
    userId: '',
    postId: '',
    text: '',
    createdAt: new Date().toISOString(), 
  }],
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

const request: CreatePostDto = {
  content: 'post.content',
  mediaUrl: "hfsdkfh",
  mediaType: "string",
  authorId: '23223',
};

const commentsPostDto: CommentPostDto = {
  postId: "",
  userId: "",
  text: ""
}

const likePostDto: LikePostDto = {
  postId: "",
  userId: ""
} 




describe("Posts Service", () => {
  let service: PostsService;
  let prisma: PrismaService;
  let cacheService: CacheService;
  let socialServiceClientService: SocialServiceClientService ;

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
              findFirst: jest.fn().mockResolvedValue(mockPost),
            },
            comment: {
              findMany: jest.fn().mockResolvedValue(mockPosts),
              findUnique: jest.fn().mockResolvedValue(mockPost),
              create: jest.fn().mockResolvedValue(mockPost),
              findFirst: jest.fn().mockResolvedValue(mockPost),
            },
            like: {
              findMany: jest.fn().mockResolvedValue(mockPosts),
              findUnique: jest.fn().mockResolvedValue(mockPost),
              create: jest.fn().mockResolvedValue(mockPost),
              findFirst: jest.fn().mockResolvedValue(mockPost),
              delete: jest.fn().mockResolvedValue({})
            }
          }
        },
        {
          provide: CacheService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            addListFirstPosts: jest.fn()
          }
        },
        {
          provide: SocialServiceClientService,
          useValue: {
            getUserFriends: jest.fn().mockReturnValue(of({authorId: request.authorId, userIds: ['','']})),            
          }
        }
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);
    cacheService = module.get<CacheService>(CacheService);
    socialServiceClientService = module.get<SocialServiceClientService>(SocialServiceClientService)
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
    const result = await service.createPost(request);
    expect(result).toEqual(mockPost);
  });

  it('should return a post with new comment', async () => {
    const result = await service.commentPost(commentsPostDto);
    expect(result).toEqual(mockPost);
  })

  it('should return a post with new like', async () => {
    const result = await service.likePost(likePostDto);
    expect(result).toEqual(mockPost);
  })
});