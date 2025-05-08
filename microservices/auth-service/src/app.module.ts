import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './auth/auth.module';
import { EmailConfirmationModule } from './auth/email-confirmation/email-confirmation.module';
import { MailModule } from './libs/mail/mail.module';
import { TwoFactorAuthModule } from './auth/two-factor-auth/two-factor-auth.module';
import { PasswordRecoveryModule } from './auth/password-recovery/password-recovery.module';
import { MetricsService } from './libs/common/metrics.service';
import { GrpcMetricsInterceptor } from './libs/common/grpc.metrics.interceptor';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrometheusModule.register({
    pushgateway: {
      url: 'http://localhost:9091' //  process.env.NODE_DEV == 'true' ? 'http://localhost:9091' : 'http://pushgateway:9091'
    },
    defaultLabels: {
      service: "auth-service"
    }
  }), UserModule, DrizzleModule, AuthModule, EmailConfirmationModule, MailModule, TwoFactorAuthModule, PasswordRecoveryModule],
  providers: [
    MetricsService,
    GrpcMetricsInterceptor,
  ],
  exports: [
    MetricsService,
    GrpcMetricsInterceptor,
  ]
})

export class AppModule {}
