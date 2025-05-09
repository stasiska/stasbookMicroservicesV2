import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaReplicaService } from './prismaReplica.service';

@Module({
  controllers: [],
  providers: [PrismaService, PrismaReplicaService],
})
export class PrismaModule {}
