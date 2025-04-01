import { forwardRef, Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { UsersModule } from '../users/users.module';
import { PropDetails } from './entities/prop-details.entity';
import { Attachments } from './entities/attachments.entity';
import { Location } from './entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Location, PropDetails, Attachments]),

    forwardRef(() => UsersModule),

  ],
  controllers: [PropertiesController,],
  providers: [PropertiesService],
  exports: [PropertiesService, TypeOrmModule.forFeature([Property, Location, PropDetails, Attachments]),]
})
export class PropertiesModule { }
