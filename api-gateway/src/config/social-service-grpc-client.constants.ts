import { SOCIAL_SERVICE_PACKAGE_NAME } from "../social/types/social_service";
import { ConfigService } from "@nestjs/config";
import { ClientProviderOptions, Transport } from "@nestjs/microservices";
import * as path from "path";
import * as dotenv from 'dotenv'

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
        url: `${process.env.SOCIAL_SERVICE_URL}` 
    }
}