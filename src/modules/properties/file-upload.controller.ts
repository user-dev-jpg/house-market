import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums';
import { ConfigService } from '@nestjs/config';

@ApiTags('File Upload 📩')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AuthGuard)
@Roles(RolesEnum.ADMIN)
@Controller('files')
export class FileUploadController {
  constructor(
    private readonly configService: ConfigService
  ) {}

  @Post('upload')
  @ApiOperation({ summary: 'Fayl yuklash (image)' })
  @ApiConsumes('multipart/form-data') // Swagger multipart/form-data qo‘llab-quvvatlashi uchun
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Fayl yuklandi',
    schema: {
      example: {
        message: 'Fayl yuklandi',
        filePath: 'https://example.com/uploads/file-1742994241727-752012357.png',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) // ✅ `new` ishlatilmadi, NestJS avtomatik qo‘llaydi
  async fileUpload(@UploadedFile() file: Express.Multer.File) {
    const url: string = this.configService.get<string>('API_URL_1');
    return {
      message: 'Fayl yuklandi',
      filePath: `${url}/uploads/${file.filename}`,
    };
  }
}
