import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '@shared/shared.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';
import { Baskets } from '@baskets/baskets.entity';
import { BasketsController } from '@baskets/baskets.controller';
import { BasketsService } from '@baskets/baskets.service';
import { BasketController } from '@baskets/basket.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Baskets]),
    SharedModule,
    UserPermissionsModule,
    PermissionModule,
  ],
  controllers: [BasketsController, BasketController],
  providers: [BasketsService],
})
export class BasketsModule {}
