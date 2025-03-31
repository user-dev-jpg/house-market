import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Property } from './entities/property.entity';
import { Attachments } from './entities/attachments.entity';
import { PropDetails } from './entities/prop-details.entity';
import { Location } from './entities/location.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreateAttachmentsDto } from './dto/create-attachments-dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property) private readonly propertyRepo: Repository<Property>,
    @InjectRepository(Attachments) private readonly attachmentsRepo: Repository<Attachments>,
    @InjectRepository(Location) private readonly locationRepo: Repository<Location>,
    @InjectRepository(PropDetails) private readonly propDetailsRepo: Repository<PropDetails>,
    private readonly dataSource: DataSource,
    
  ) { }

  async create(createPropertyDto: CreatePropertyDto): Promise<{ property: string }> {

    try {
      const newProperty = this.propertyRepo.create({
        homeIndex: createPropertyDto.homeIndex,
        salePrice: createPropertyDto.salePrice,
        description: createPropertyDto.description,
        rooms: createPropertyDto.rooms,
      });
      
      const savedProperty = await this.propertyRepo.save(newProperty);
      
      
      savedProperty.location = this.locationRepo.create({  })
      
      console.log(savedProperty);
      // savedProperty.attachments = []
      return { property: 'salom aka' }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // all propertys  
  async findAll(): Promise<{ propertys: Property[] }> {
    try {
      return {
        propertys: await this.propertyRepo.find({
          relations: {
            attachments: true,
            location: true,
            propDetails: true
          }
        })
      }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  // get one property by id
  async findOne(id: string): Promise<{ property: Property }> {
    try {
      return {
        property: await this.propertyRepo.findOne({
          where: { id },
          relations: {
            attachments: true,
            location: true,
            propDetails: true
          }
        })
      }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // update property
  async update(id: string, updatePropertyDto: UpdatePropertyDto): Promise<string> {
    try {

      const property = await this.propertyRepo.findOne({
        where: { id },
        relations: ["attachments", "location", "propDetails"]
      });

      if (!property) {
        throw new NotFoundException('Property not found');
      }
      console.log(property);

      return `salom uka`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // delete property
  async remove(id: string) {
    try {
      const property = await this.propertyRepo.findOne({ where: { id } })
      if (!property) {
        throw new NotFoundException('not found property')
      }

      const { affected } = await this.propertyRepo.delete(id)

      return affected && affected > 0 ? `Succfully deleted!` : `Delete filed`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
