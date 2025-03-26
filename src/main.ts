import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, SetupGlobalPipes, SwaggerConfig } from './configs';
import { NotFoundExceptionFilter } from './filters/http-exception.filter';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configServie = app.get(ConfigService)

  app.setGlobalPrefix('api')

  CorsConfig(app)
  SwaggerConfig(app)
  SetupGlobalPipes(app)


  app.useGlobalFilters(new NotFoundExceptionFilter())

  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });

  const port = configServie.get<number>("PORT")

  await app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
  });
}
bootstrap();
