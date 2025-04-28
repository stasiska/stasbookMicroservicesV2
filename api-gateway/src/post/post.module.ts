import { PostServiceClientService } from "../grpcClients/post-service-client.service";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { postServiceGrpcClientOptions } from "../config/post-service-grpc-client.constants";

@Module({
    imports: [ClientsModule.register([postServiceGrpcClientOptions])],
    providers: [PostServiceClientService, PostService],
    controllers: [PostController],
})
export class PostModule {}