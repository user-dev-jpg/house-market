import { forwardRef, Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { UsersModule } from '../users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FileUploadController } from './file-upload.controller';
import { PropDetails } from './entities/prop-details.entity';
import { Attachments } from './entities/attachments.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Location, PropDetails, Attachments]),

    forwardRef(() => UsersModule),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [PropertiesController, FileUploadController],
  providers: [PropertiesService],
  exports: [PropertiesService, TypeOrmModule.forFeature([Property, Location, PropDetails, Attachments]),]
})
export class PropertiesModule { }
