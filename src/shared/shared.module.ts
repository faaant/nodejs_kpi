import { Module } from '@nestjs/common';
import { JWTTokenService } from './jwt-key.service';

@Module({
  providers: [JWTTokenService],
  exports: [JWTTokenService],
})
export class SharedModule {}
