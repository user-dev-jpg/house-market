import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { CreateAttachmentsDto } from "./create-attachments-dto";
import { CreateLocationDto } from "./create-location.dto";
import { CreatePropDetailsDto } from "./create-prop-details.dto";

export class CreatePropertyDto {
	@ApiProperty({ example: 329, description: "Property home index" })
	@IsInt()
	homeIndex: number;

	@ApiProperty({ example: 2500, description: "Sale price of the property" })
	@IsInt()
	salePrice: number;

	@ApiProperty({ example: "Beautiful house in San Francisco", description: "Description of the property" })
	@IsString()
	description: string;

	@ApiProperty({ example: 5, description: "Total number of rooms" })
	@IsInt()
	rooms: number;

	@ApiProperty({ type: () => [CreateAttachmentsDto], description: "List of attachments" })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateAttachmentsDto)
	attachments: CreateAttachmentsDto[];

	@ApiProperty({ type: () => CreateLocationDto, description: "Location details" })
	@ValidateNested()
	@Type(() => CreateLocationDto)
	location: CreateLocationDto;

	@ApiProperty({ type: () => CreatePropDetailsDto, description: "Property details" })
	@ValidateNested()
	@Type(() => CreatePropDetailsDto)
	propDetails: CreatePropDetailsDto;
}
