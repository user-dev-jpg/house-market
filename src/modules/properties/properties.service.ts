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

  async create(createPropertyDto: CreatePropertyDto): Promise<{ property: Property }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const property = this.propertyRepo.create({
        homeIndex: createPropertyDto.homeIndex,
        salePrice: createPropertyDto.salePrice,
        description: createPropertyDto.description,
        rooms: createPropertyDto.rooms,
      });

      const savedProperty = await queryRunner.manager.save(property);

      if (createPropertyDto.location) {
        savedProperty.location = await queryRunner.manager.save(
          this.locationRepo.create({ ...createPropertyDto.location, property: savedProperty["id"] })
        );
      }

      if (createPropertyDto.propDetails) {
        savedProperty.propDetails = await queryRunner.manager.save(
          this.propDetailsRepo.create({ ...createPropertyDto.propDetails, property: savedProperty["id"] })
        );
      }

      if (createPropertyDto.attachments?.length) {
        savedProperty.attachments = await queryRunner.manager.save(
          this.attachmentsRepo.create(
            createPropertyDto.attachments.map(attachment => ({
              imgPath: attachment.imgPath,
              avatar: attachment.avatar,
              property: savedProperty["id"],
            }))
          )
        );
      }

      await queryRunner.commitTransaction();
      return { property: await this.propertyRepo.save(savedProperty) };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Property creation failed', error.message);
    } finally {
      await queryRunner.release();
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
