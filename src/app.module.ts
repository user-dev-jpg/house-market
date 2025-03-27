import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig, JwtConfig, ThrottlerConfig, TypeOrmConfig } from './configs';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GloabalResponseFormatterInterceptors } from './interceptors/global-response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PropertiesModule } from './modules/properties/properties.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


@Module({
  imports: [
    ConfigModule.forRoot(EnvConfig),

    JwtModule.registerAsync(JwtConfig),

    TypeOrmModule.forRootAsync(TypeOrmConfig),

    ThrottlerModule.forRootAsync(ThrottlerConfig),

    UsersModule,
    AuthModule,
    PropertiesModule

  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GloabalResponseFormatterInterceptors
    },
  ],
})
export class AppModule { }
