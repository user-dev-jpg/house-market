import { UpdateAttachmentDto } from './dto/update-attachments-dto';
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
import { UpdateLocationDto } from './dto/update-location-dto';
import { UpdatePropDetailsDto } from './dto/update-prop-details.dto';

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

      if (!updatePropertyDto || Object.keys(updatePropertyDto).length === 0) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiriting`)
      }

      const property = await this.propertyRepo.findOne({
        where: { id },
        relations: ["attachments", "location", "propDetails"]
      });

      if (!property) {
        throw new NotFoundException('Property not found');
      }
      const { affected } = await this.propertyRepo.update(id, updatePropertyDto)

      return affected && affected > 0 ? `Muvaffaqiyatli yangilandi` : `Yangilash amalga oshmadi`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  // update attachments
  async updateAttachments(id: string, updateAttachmentDto: UpdateAttachmentDto): Promise<string> {
    try {
      if (!updateAttachmentDto || Object.keys(updateAttachmentDto).length === 0) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiriting`)
      }

      const attachments = await this.attachmentsRepo.findOne({ where: { id } })

      if (!attachments) {
        throw new NotFoundException('attachment not found');
      }
      const { affected } = await this.attachmentsRepo.update(id, updateAttachmentDto)


      return affected && affected > 0 ? `Muvaffaqiyatli yangilandi` : `Yangilash amalga oshmadi`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // update location
  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<string> {
    try {
      if (!updateLocationDto || Object.keys(updateLocationDto).length === 0) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiriting`)
      }

      const location = await this.locationRepo.findOne({ where: { id } })

      if (!location) {
        throw new NotFoundException('location not found');
      }
      const { affected } = await this.locationRepo.update(id, updateLocationDto)

      return affected && affected > 0 ? `Muvaffaqiyatli yangilandi` : `Yangilash amalga oshmadi`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // update Prop Details
  async updatePropDetails(id: string, updatePropDetailsDto: UpdatePropDetailsDto): Promise<string> {
    try {
      if (!updatePropDetailsDto || Object.keys(updatePropDetailsDto).length === 0) {
        throw new BadRequestException(`Yangilash uchun biror maydon kiriting`)
      }

      const propDetails = await this.propDetailsRepo.findOne({ where: { id } })

      if (!propDetails) {
        throw new NotFoundException('Prop Details #id not found');
      }
      const { affected } = await this.propDetailsRepo.update(id, updatePropDetailsDto)

      return affected && affected > 0 ? `Muvaffaqiyatli yangilandi` : `Yangilash amalga oshmadi`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }


  // delete property
  async remove(id: string): Promise<string> {
    try {
      const property = await this.propertyRepo.findOne({
        where: { id },
        relations: ['attachments', 'location', 'propDetails'], // Barcha bog‘langan entitylarni olish
      });
      console.log(property);
      
      if (!property) {
        throw new NotFoundException('not found property')
      }

      await this.propertyRepo.remove(property);

      return `Succfully deleted!`
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
