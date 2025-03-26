import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileUploadservice } from './file-upload.service';

@Controller('files')
export class FileUploadController {

	constructor(private readonly fileUploadService: FileUploadservice) { }

	@Post('upload')
	@UseInterceptors(FileInterceptor('file', new FileUploadservice().getMulterConfig()))
	async fileUpload(@UploadedFile() file: Express.Multer.File) {
		return {
			message: "Fayl yuklandi",
			filePath: this.fileUploadService.getFileUrl(file.filename),
		}
	}
}
