import { Controller, Get, Body, Patch, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthGuard } from '../../common/guards/role.guard';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from '../../enums';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('all')
  @ApiOperation({ summary: 'Barcha userlarni olish   (only admin)' })
  @ApiOkResponse({ description: 'Users data' })
  @ApiForbiddenResponse({ description: `Faqat admin barcha userlarni ola oladi` })
  @Roles(RolesEnum.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'User profilini olishh' })
  @ApiOkResponse({ description: 'User  profile muvaffaqiyatli yangilandi' })
  profile(@Req() req: Request) {
    delete req?.user.password

    return req?.user
  }

  @Patch()
  @ApiOperation({ summary: 'User profile ni token bo`yicha yangilash ( parol alohida yangilanadi, faqat token ozi yetarli)' })
  @ApiOkResponse({ description: 'User token bo`yicha muvaffaqiyatli yangilandi' })
  @ApiBadRequestResponse({ description: `Yangilash uchun biror maydon kiriting` })
  @ApiBody({
    description: 'Foydalanuvchi ma\'lumotlarini yangilash uchun kerakli maydonlar.',
    type: UpdateUserDto,
  }
  )
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req?.user.id, updateUserDto);
  }

}
