import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@user/users.module';
import { SharedModule } from '@shared/shared.module';

import { AuthController } from '@auth/auth.controller';
import { JwtStrategy } from '@auth/jwt.strategy';
import { AuthService } from '@auth//auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SharedModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
