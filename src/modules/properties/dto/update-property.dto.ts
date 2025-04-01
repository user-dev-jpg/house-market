import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(
	PickType(CreatePropertyDto, ["homeIndex", "rooms", "description", "salePrice"] as const)
) { }
