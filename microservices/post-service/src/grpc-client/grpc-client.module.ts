// src/grpc-client/grpc-client.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { socialServiceGrpcClientOptions } from '../config/social-service-grpc-client.constants';
import { SocialServiceClientService } from '../grpc-client/social-service-client.service';
@Module({
  imports: [
    ClientsModule.register([socialServiceGrpcClientOptions])
  ],
  providers: [SocialServiceClientService],
  exports: [SocialServiceClientService]
})
export class GrpcClientModule {}