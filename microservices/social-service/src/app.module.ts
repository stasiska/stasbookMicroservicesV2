import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocialModule } from './social/social.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), SocialModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
