import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsArray, IsEnum } from "class-validator";
import { PropertyType } from "src/enums/properties-type.enum";
import { IProperty } from "src/interfaces/properties.interface";

export class CreatePropertyDto implements Omit<IProperty, 'id'> {
	@ApiProperty({ example: 'Luxury Villa with Pool' })
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({ example: 'House', description: `Property type`, enum: PropertyType })
	@IsNotEmpty()
	@IsEnum(PropertyType, {
		message: `Property types are only: houses, apartments, condos, retail, villas, offices`
	})
	type: string;

	@ApiProperty({ example: 3 })
	@IsNotEmpty()
	@IsNumber()
	beds: number;

	@ApiProperty({ example: '2005' })
	@IsNotEmpty()
	@IsString()
	year_build: string;

	@ApiProperty({ example: 2 })
	@IsNotEmpty()
	@IsNumber()
	baths: number;

	@ApiProperty({ example: '200 sqm' })
	@IsNotEmpty()
	@IsString()
	home_area: string;

	@ApiProperty({ example: 5 })
	@IsNotEmpty()
	@IsNumber()
	rooms: number;

	@ApiProperty({ example: 30 })
	@IsNotEmpty()
	@IsNumber()
	garage_area: number;

	@ApiProperty({ example: 2 })
	@IsNotEmpty()
	@IsNumber()
	garages: number;

	@ApiProperty({ example: 250000 })
	@IsNotEmpty()
	@IsNumber()
	price: number;

	@ApiProperty({ example: 260000 })
	@IsNotEmpty()
	@IsNumber()
	price_custom: number;

	@ApiProperty({ example: 'New York' })
	@IsNotEmpty()
	@IsString()
	city: string;

	@ApiProperty({ example: '123 Main Street' })
	@IsNotEmpty()
	@IsString()
	street: string;

	@ApiProperty({ example: 10001 })
	@IsNotEmpty()
	@IsNumber()
	zip_code: number;

	@ApiProperty({ example: 12 })
	@IsNotEmpty()
	@IsNumber()
	home_index: number;

	@ApiProperty({ example: 'USA' })
	@IsNotEmpty()
	@IsString()
	country: string;

	@ApiProperty({ example: 'NY' })
	@IsNotEmpty()
	@IsString()
	state: string;

	@ApiProperty({ example: 'Downtown' })
	@IsNotEmpty()
	@IsString()
	area: string;

	@ApiProperty({ example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'] })
	@IsArray()
	@IsNotEmpty()
	featured_image: string[];

	@ApiProperty({ example: 'https://example.com/main_img.jpg' })
	@IsNotEmpty()
	@IsString()
	main_image: string;

	@ApiProperty({ example: 'A+' })
	@IsNotEmpty()
	@IsString()
	energy_class: string;

	@ApiProperty({ example: '90' })
	@IsNotEmpty()
	@IsString()
	energy_index: string;
}
