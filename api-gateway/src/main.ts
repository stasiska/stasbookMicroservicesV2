import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import RedisStore from 'connect-redis';
import { default as IORedis } from 'ioredis'
import { ms, StringValue } from './libs/common/utils/ms.util';
import { parseBoolean } from './libs/common/utils/parse-boolean.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const redis = new IORedis(`redis://${config.getOrThrow<string>('REDIS_USER')}:${config.getOrThrow<string>('REDIS_PASSWORD')}@${config.getOrThrow<string>('REDIS_HOST')}:${config.getOrThrow<number>('REDIS_PORT')}`)

  
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

  const configSwagger = new DocumentBuilder()
    .setTitle('StasBook API gateway')
    .setDescription('The Stasbook api for use microservices')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory)
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(
    session({
      store: new RedisStore({
				client: redis,
				prefix: 'sessions:'
			}),
      secret: config.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: parseBoolean(
					config.getOrThrow<string>('SESSION_HTTP_ONLY')
				),
        secure: parseBoolean(
					config.getOrThrow<string>('SESSION_SECURE')
				),
        maxAge: ms(config.getOrThrow<StringValue>('SESSION_MAX_AGE')),
      },
    })
  );
 // hello
  app.enableCors({
    origin: config.getOrThrow<string>('ALLOWED_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
  });

  const port = config.getOrThrow<number>('APPLICATION_PORT');
  const url = config.getOrThrow<number>('APPLICATION_URL');
  app.listen(port)
  console.log(`API Gateway is running on ${url}`);
}
bootstrap();
