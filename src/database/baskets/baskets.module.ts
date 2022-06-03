import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@shared/shared.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';
import { Baskets } from './baskets.entity';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Baskets]),
    SharedModule,
    UserPermissionsModule,
    PermissionModule,
  ],
  controllers: [BasketsController],
  providers: [BasketsService],
})
export class BasketsModule {}
