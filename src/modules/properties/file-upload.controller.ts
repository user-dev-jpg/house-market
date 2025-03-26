import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadservice } from './file-upload.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enums';
import { ConfigService } from '@nestjs/config';


@ApiTags('File Upload 📩 ')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AuthGuard)
@Roles(RolesEnum.ADMIN)
@Controller('files')
export class FileUploadController {

	constructor(
		private readonly fileUploadService: FileUploadservice,
		private configServise: ConfigService
	) { }

	@Post('upload')
	@ApiOperation({ summary: `Fayil  yuklash( image )` })
	@ApiCreatedResponse({ description: `Fayil   yuklandi` })
	@UseInterceptors(FileInterceptor('file', new FileUploadservice().getMulterConfig()))
	async fileUpload(@UploadedFile() file: Express.Multer.File) {

		const url: string = this.configServise.get<string>('API_URL_1')

		return {
			message: "Fayl yuklandi",
			filePath: `${url}/uploads/${file.filename}`,
		}
	}
}
