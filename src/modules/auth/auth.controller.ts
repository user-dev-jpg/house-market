import { Controller, Post, Body, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  ApiTags, ApiOperation,
  ApiBearerAuth, ApiBody, ApiBadRequestResponse,
  ApiUnauthorizedResponse, ApiOkResponse,
  ApiCreatedResponse
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
@Throttle({ default: { limit: 5, ttl: 60000 } })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiCreatedResponse({ description: 'Foydalanuvchi muvaffaqiyatli yaratildi.' })
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
  async login(@Body() loginDto: LoginAuthDto, @Res() res: Response) {
    const data = await this.authService.login(loginDto)
    return res.status(200).json(data)
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tokenni yangilash' })
  @ApiOkResponse({ description: 'Token muvaffaqiyatli yangilandi.' })
  @ApiUnauthorizedResponse({ description: 'Token yaroqsiz yoki muddati o‘tgan.' })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const data = await this.authService.refresh(req?.user);
    return res.status(200).json(data)
  }
}
