import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@users/users.module';

import { AuthController } from '@auth/auth.controller';
import { JwtStrategy } from '@auth/jwt.strategy';
import { AuthService } from '@auth//auth.service';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    SharedModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
