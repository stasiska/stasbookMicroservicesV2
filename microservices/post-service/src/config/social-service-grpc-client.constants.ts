// src/config/social-service-grpc-client.constants.ts
import { SOCIAL_SERVICE_PACKAGE_NAME } from "../interface/social_service";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import * as path from "path";
import { ConfigService } from "@nestjs/config";

const config = new ConfigService();

export const socialServiceGrpcClientOptions: ClientProviderOptions = {
    name: SOCIAL_SERVICE_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
        channelOptions: {
            grpc_arg_enable_channelz: 0,
        },
        package: [SOCIAL_SERVICE_PACKAGE_NAME],
        protoPath: path.join(__dirname, '../../src/_proto/social_service.proto'),
        url: `${process.env.SOCIAL_SERVICE_URL}:${process.env.SOCIAL_SERVICE_PORT}` //|| "localhost:55014"
    } 
};