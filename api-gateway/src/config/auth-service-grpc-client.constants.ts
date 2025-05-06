import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';

export const authServiceGrpcClientOptions: ClientProviderOptions = {
    name: "user_service",
    transport: Transport.GRPC,
    options: {
        channelOptions: {
            grpc_arg_enable_channelz: 0,
        },
        package: ["user_service"],
        protoPath: path.join(__dirname, '../../src/_proto/auth_service.proto'),
        url: 'localhost:55011' // for prod `${process.env.AUTH_SERVICE_URL}`  
    }
}