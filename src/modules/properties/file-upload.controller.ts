import { BadRequestException, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums';
import { ConfigService } from '@nestjs/config';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('File Upload 📩')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AuthGuard)
@Roles(RolesEnum.ADMIN)
@Controller('files')
export class FileUploadController {
  constructor(
    private readonly configService: ConfigService
  ) { }

  @Post('upload')
  @ApiOperation({ summary: 'Fayl yuklash (image)' })
  @ApiConsumes('multipart/form-data') // Swagger multipart/form-data qo‘llab-quvvatlash
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
  @ApiBadRequestResponse({ description: `Noto'g'ri fayil formati` })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),

    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new BadRequestException('Faqat JPG, PNG, JPG yoki WEBP formatlar qabul qilinadi!'), false);
      }
      cb(null, true);
    },
  }))

  async fileUpload(@UploadedFile() file: Express.Multer.File) {

    if (!file || !file.filename) {
      throw new BadRequestException('Fayl yuklanmadi yoki noto‘g‘ri formatda!');
    }

    const url: string = this.configService.get<string>('API_URL_1');
    return {
      message: 'Fayl yuklandi',
      filePath: `${url}/uploads/${file.filename}`,
    };
  }
}
