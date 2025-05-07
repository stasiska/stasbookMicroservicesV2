import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts-grpc.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SharedCacheModule } from '../libs/cacheRedis/src/cache.module'
import { ClientsModule } from '@nestjs/microservices';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';

@Module({
  imports: [SharedCacheModule, GrpcClientModule],
  controllers: [PostsController],
  providers: [PostsService,PrismaService],
})
export class PostsModule {}
