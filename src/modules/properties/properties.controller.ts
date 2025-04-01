import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums';
import { UuidDto } from './dto/uuid.dto';
import { UpdateAttachmentDto } from './dto/update-attachments-dto';
import { UpdateLocationDto } from './dto/update-location-dto';
import { UpdatePropDetailsDto } from './dto/update-prop-details.dto';


@ApiTags('Properties')
@ApiBearerAuth()
@Controller('propertys')
export class PropertiesController {

  constructor(private readonly propertiesService: PropertiesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Yangi property' })
  @ApiCreatedResponse({ description: 'yangi property yaratildi' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: `Kiritilgan malumotlar xatoligi` })
  @ApiBody({ type: CreatePropertyDto })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Hamma property lar' })
  @ApiOkResponse({ description: 'Barcha property lar muvaffaqiyatli olindi' })
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Property id# bo`yicha' })
  @ApiOkResponse({ description: 'Property id# bo`yicha muvaffaqiyatli olindi' })
  @ApiNotFoundResponse({ description: 'Property id# topilmadi' })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Property UUID' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  findOne(@Param() uuidDto: UuidDto) {
    return this.propertiesService.findOne(uuidDto.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Property id# bo`yicha yangilash' })
  @ApiOkResponse({ description: 'Property id# bo`yicha muvaffaqiyatli yangilandi' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: `Yangilash uchun biror maydon kiriting` })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Property UUID' })
  @ApiBody({ type: UpdatePropertyDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param() uuidDto: UuidDto, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(uuidDto.id, updatePropertyDto);
  }


  @Patch('attachment/:id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Attachment id# bo`yicha yangilash' })
  @ApiOkResponse({ description: 'Attachment id# bo`yicha muvaffaqiyatli yangilandi' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: `Yangilash uchun biror maydon kiriting` })
  @ApiBody({ type: UpdateAttachmentDto })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Attachment UUID' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateAttachments(@Param() uuidDto: UuidDto, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.propertiesService.updateAttachments(uuidDto.id, updateAttachmentDto);
  }

  @Patch('location/:id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Location id# bo`yicha yangilash' })
  @ApiOkResponse({ description: 'Location id# bo`yicha muvaffaqiyatli yangilandi' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: `Yangilash uchun biror maydon kiriting` })
  @ApiBody({ type: UpdateLocationDto })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Location UUID' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updateLocation(@Param() uuidDto: UuidDto, @Body() updateLocationDto: UpdateLocationDto) {
    return this.propertiesService.updateLocation(uuidDto.id, updateLocationDto);
  }

  @Patch('prop-details/:id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Prop Deatails id# bo`yicha yangilash' })
  @ApiOkResponse({ description: 'Prop Deatails id# bo`yicha muvaffaqiyatli yangilandi' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: `Yangilash uchun biror maydon kiriting` })
  @ApiBody({ type: UpdatePropDetailsDto })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Prop Deatails UUID' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePropDetails(@Param() uuidDto: UuidDto, @Body() updatePropDetailsDto: UpdatePropDetailsDto) {
    return this.propertiesService.updatePropDetails(uuidDto.id, updatePropDetailsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AuthGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Property id# bo`yicha o`chirish' })
  @ApiOkResponse({ description: 'Property id# bo`yicha muvaffaqiyatli o`chirildi' })
  @ApiParam({ name: 'id', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Property UUID' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  remove(@Param() uuidDto: UuidDto) {
    return this.propertiesService.remove(uuidDto.id);
  }
}
