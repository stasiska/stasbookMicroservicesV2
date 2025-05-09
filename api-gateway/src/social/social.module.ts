import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { socialServiceGrpcClientOptions } from "src/config/social-service-grpc-client.constants";
import { SocialService } from "./social.service";
import { SocialController } from "./social.controller";
import { SocialServiceClientService } from "src/grpcClients/social-service-client.service";

@Module({
    imports: [ClientsModule.register([socialServiceGrpcClientOptions])],
    providers: [SocialService, SocialServiceClientService],
    controllers: [SocialController],
})

export class SocialModule {}