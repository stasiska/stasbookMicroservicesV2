import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { UserService } from '../../user/user.service';
import { MailService } from '../../libs/mail/mail.service';
import { DrizzleModule } from '../../drizzle/drizzle.module';

@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, MailService, UserService],
  imports: [DrizzleModule],
  exports: [PasswordRecoveryService]
})
export class PasswordRecoveryModule {}
