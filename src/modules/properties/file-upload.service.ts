import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";

@Injectable()
export class FileUploadservice {
	getMulterConfig() {
		return {

			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
					cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
				},
			}),
		}
	}

	getFileUrl(filename: string): string {
		return `/uploads/${filename}`;
	}
}