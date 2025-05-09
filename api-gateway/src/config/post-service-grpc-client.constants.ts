import { POST_SERVICE_PACKAGE_NAME } from '../post/types/post_service';
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();
//console.log(config.getOrThrow<string>('AUTH_SERVICE_URL'))
export const postServiceGrpcClientOptions: ClientProviderOptions = {
    name: POST_SERVICE_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
        channelOptions: {
            grpc_arg_enable_channelz: 0,
        },
        package: [POST_SERVICE_PACKAGE_NAME],
        protoPath: path.join(__dirname, '../../src/_proto/post_service.proto'),
        url: `${process.env.POST_SERVICE_URL}`
    }
}