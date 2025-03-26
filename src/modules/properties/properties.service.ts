import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PropertiesService {

  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>
  ) { }

  // create new property
  async create(createPropertyDto: CreatePropertyDto): Promise<{ property: Property }> {
    try {

      const createdProperty: Property = this.propertyRepo.create(createPropertyDto)

      return { property: await this.propertyRepo.save(createdProperty) }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  // all propertys  
  async findAll(): Promise<{ propertys: Property[] }> {
    try {
      return { propertys: await this.propertyRepo.find() }
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  // get one property by id
  async findOne(id: string): Promise<{ property: Property }> {
    try {
      return { property: await this.propertyRepo.findOne({ where: { id } }) }
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
        throw new BadRequestException('yangilash uchun biror maydon kiriting')
      }
      const property = await this.propertyRepo.findOne({ where: { id } })
      if (!property) {
        throw new NotFoundException('not found property')
      }

      const { affected } = await this.propertyRepo.update(id, updatePropertyDto)

      return affected && affected > 0 ? `Succfully updated` : `Update filed`
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
