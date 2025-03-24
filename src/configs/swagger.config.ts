import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const SwaggerConfig = (app: INestApplication) => {

	const configService = app.get(ConfigService); // ConfigService ni olish

	const baseUrl_1 = configService.get<string>('API_URL_1');
	const baseUrl_2 = configService.get<string>('API_URL_2');

	const options = new DocumentBuilder()
		.setTitle('House market')
		.setDescription('House market API documentation')
		.setVersion('1.0')
		.addTag('House market API')
		.addServer(`${baseUrl_1}/`, `Dynamic Server`)
		.addServer(`${baseUrl_2}/`, `Localni Server`)
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api/docs', app, document)
}