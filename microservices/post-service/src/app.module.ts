import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PostsModule ,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
