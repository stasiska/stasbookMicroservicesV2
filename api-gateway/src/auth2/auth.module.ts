import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { AuthContoller } from "./auth.contoller";
import { authServiceGrpcClientOptions } from "../config/auth-service-grpc-client.constants";
import { AuthServiceClientService } from "../grpcClients/auth-service-client.service";

@Module({
    imports: [ClientsModule.register([authServiceGrpcClientOptions])],
    providers: [AuthServiceClientService, AuthService],
    controllers: [AuthContoller],
})
export class AuthModule {}