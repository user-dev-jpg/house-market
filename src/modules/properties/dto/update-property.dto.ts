import { PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePropertyDto } from './create-property.dto';
import { CreateAttachmentsDto } from './create-attachments-dto';
import { CreateLocationDto } from './create-location.dto';
import { CreatePropDetailsDto } from './create-prop-details.dto';

// Ichki DTO-larni `PartialType` qilish
class UpdateAttachmentsDto extends PartialType(CreateAttachmentsDto) { }
class UpdateLocationDto extends PartialType(CreateLocationDto) { }
class UpdatePropDetailsDto extends PartialType(CreatePropDetailsDto) { }

export class UpdatePropertyDto {
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => UpdateAttachmentsDto)
	attachments?: UpdateAttachmentsDto[];

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdateLocationDto)
	location?: UpdateLocationDto;

	@IsOptional()
	@ValidateNested()
	@Type(() => UpdatePropDetailsDto)
	propDetails?: UpdatePropDetailsDto;

	@IsOptional()
	homeIndex?: number;

	@IsOptional()
	salePrice?: number;

	@IsOptional()
	description?: string;

	@IsOptional()
	rooms?: number;
}
