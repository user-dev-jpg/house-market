import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  // find all
  async findAll(): Promise<{ users: User[] }> {
    try {

      const users: User[] = await this.userRepo.find()

      return {
        users: users.map((el) => {
          delete el.password
          return el
        })
      }
    } catch (error) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST)

    }
  }

  // update user profile
  async update(id: string, updateUserDto: Omit<UpdateUserDto, "password">): Promise<string> {
    try {
      if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
        throw new BadRequestException('Yangilash uchun biror maydon kiriting')
      }

      const updateResult = await this.userRepo.update(id, updateUserDto);

      if (!updateResult || typeof updateResult.affected !== 'number') {
        throw new InternalServerErrorException('Update natijasi noma’lum');
      }

      return updateResult.affected > 0 ? `Successfully updated` : `Update failed`;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

}
