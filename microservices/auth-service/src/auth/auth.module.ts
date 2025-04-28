import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { ProviderModule } from './provider/provider.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getProvidersConfig } from 'src/config/providers.config';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/libs/mail/mail.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';

@Module({
  imports: [
    PasswordRecoveryModule,
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService],},),
      DrizzleModule,
      forwardRef(() => EmailConfirmationModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService, TwoFactorAuthService,],
  exports: [AuthService]
})
export class AuthModule {}
