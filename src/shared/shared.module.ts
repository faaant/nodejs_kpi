import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTTokenService } from '@shared/jwt-token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [JWTTokenService],
  exports: [JWTTokenService],
})
export class SharedModule {}
