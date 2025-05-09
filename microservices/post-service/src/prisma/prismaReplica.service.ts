import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../prisma/replica/__generated__/replica';


@Injectable()
export class PrismaReplicaService 
      extends PrismaClient
      implements OnModuleInit,OnModuleDestroy{
      
      public async onModuleInit(): Promise<void> {
        await this.$connect()
      }
      public async onModuleDestroy(): Promise<void> {
        await this.$disconnect
      }
 
}
