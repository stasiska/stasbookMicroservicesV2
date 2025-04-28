import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth2';
import { PostModule } from './post/post.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './libs/common/logging.interceptor';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  PrometheusModule.register(), AuthModule, PostModule],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  }],
})
export class AppModule {}
