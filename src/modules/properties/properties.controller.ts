import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums';

@ApiTags('Properties')
@ApiBearerAuth()
@Controller('propertys')
@UseGuards(JwtAuthGuard, AuthGuard)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }

  @Post()
  @ApiOperation({ description: 'Yangi property' })
  @ApiCreatedResponse({ description: 'yangi property yaratildi' })
  @Roles(RolesEnum.ADMIN)
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
