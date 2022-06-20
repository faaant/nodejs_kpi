import { Module } from '@nestjs/common';

import { SharedModule } from '@shared/shared.module';
import { UserPermissionsModule } from '@user-permissions/user-permissions.module';
import { PermissionModule } from '@permissions/permissions.module';
import { BasketsController } from 'common/models/baskets/baskets.controller';
import { BasketsService } from 'common/models/baskets/baskets.service';
import { BasketController } from 'common/models/baskets/basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baskets } from '@database/entities/baskets.entity';

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
