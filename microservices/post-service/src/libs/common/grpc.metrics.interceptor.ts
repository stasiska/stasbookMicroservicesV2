import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricsService } from './metrics.service';

@Injectable()
export class GrpcMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const serviceName = context.getClass().name;
    const methodName = context.getHandler().name;
    
    this.metricsService.activeRequests.inc({ service: serviceName });

    const timer = this.metricsService.requestDuration.startTimer({
      service: serviceName,
      method: methodName
    });

    return next.handle().pipe(
      tap({
        next: () => {
          this.metricsService.grpcCallCounter.inc({
            method: methodName,
            status: 'success',
            service: serviceName
          });
        },
        error: () => {
          this.metricsService.grpcCallCounter.inc({
            method: methodName,
            status: 'error',
            service: serviceName
          });
        },
        finalize: () => {
          timer();
          this.metricsService.activeRequests.dec({ service: serviceName });
          this.metricsService.pushMetrics().catch(console.error);
        }
      })
    );
  }
}