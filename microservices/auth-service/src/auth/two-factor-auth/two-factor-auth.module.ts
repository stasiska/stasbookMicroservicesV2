import { Module } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { MailService } from '../../libs/mail/mail.service';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  imports: [
    DrizzleModule
  ],
  providers: [TwoFactorAuthService, MailService],
})
export class TwoFactorAuthModule {}
