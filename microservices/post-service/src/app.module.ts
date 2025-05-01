import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MetricsService } from './libs/common/metrics.service';
import { GrpcMetricsInterceptor } from './libs/common/grpc.metrics.interceptor';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrometheusModule.register({
    pushgateway: {
      url: 'http://pushgateway:9091',
    },
    defaultLabels: {
      service: "post-service"
    },
  }), PostsModule ,PrismaModule],
  controllers: [],
  providers: [
    MetricsService,
    GrpcMetricsInterceptor,
  ],
  exports: [
    MetricsService,
    GrpcMetricsInterceptor,
  ]
})
export class AppModule {}
