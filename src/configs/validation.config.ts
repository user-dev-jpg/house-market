import { BadRequestException, INestApplication, ValidationPipe } from "@nestjs/common";

export const SetupGlobalPipes = (app: INestApplication) => {

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			exceptionFactory: (errors) => {
				const messages = errors.map((error) => ({
					property: error.property,
					constraints: error.constraints,
				}));
				return new BadRequestException(messages);
			},
		})
	)
}