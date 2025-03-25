import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  ApiTags, ApiOperation,
  ApiBearerAuth, ApiBody, ApiBadRequestResponse,
  ApiUnauthorizedResponse, ApiOkResponse
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiOkResponse({ description: 'Foydalanuvchi muvaffaqiyatli yaratildi.' })
  @ApiBadRequestResponse({ description: 'Yaroqsiz ma‘lumotlar.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kirishi' })
  @ApiOkResponse({ description: 'Muvaffaqiyatli login.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized user!' })
  @ApiUnauthorizedResponse({ description: 'Incorrect password' })
  @ApiBadRequestResponse({ description: 'Login yoki email ni biridan foydalaning' })
  @ApiBadRequestResponse({ description: 'Login yoki email kiriting' })
  login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tokenni yangilash' })
  @ApiOkResponse({ description: 'Token muvaffaqiyatli yangilandi.' })
  @ApiUnauthorizedResponse({ description: 'Token yaroqsiz yoki muddati o‘tgan.' })
  refresh(@Req() req: Request) {
    return this.authService.refresh(req?.user);
  }
}
