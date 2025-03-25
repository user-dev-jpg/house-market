import { ApiProperty } from "@nestjs/swagger";
import { IProperty } from "src/interfaces/properties.interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property implements IProperty {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
	id: string;

	@Column()
	@ApiProperty({ example: 'Luxury Villa with Pool' })
	description: string;

	@Column()
	@ApiProperty({ example: 'House' })
	type: string;

	@Column()
	@ApiProperty({ example: 3 })
	beds: number;

	@Column()
	@ApiProperty({ example: '2005' })
	year_build: string;

	@Column()
	@ApiProperty({ example: 2 })
	baths: number;

	@Column()
	@ApiProperty({ example: '200 sqm' })
	home_area: string;

	@Column()
	@ApiProperty({ example: 5 })
	rooms: number;

	@Column()
	@ApiProperty({ example: 30 })
	garage_area: number;

	@Column()
	@ApiProperty({ example: 2 })
	garages: number;

	@Column()
	@ApiProperty({ example: 250000 })
	price: number;

	@Column()
	@ApiProperty({ example: 260000 })
	price_custom: number;

	@Column()
	@ApiProperty({ example: 'New York' })
	city: string;

	@Column()
	@ApiProperty({ example: '123 Main Street' })
	street: string;

	@Column()
	@ApiProperty({ example: 10001 })
	zip_code: number;

	@Column()
	@ApiProperty({ example: 12 })
	home_index: number;

	@Column()
	@ApiProperty({ example: 'USA' })
	country: string;

	@Column()
	@ApiProperty({ example: 'NY' })
	state: string;

	@Column()
	@ApiProperty({ example: 'Downtown' })
	area: string;

	@Column('text', { array: true })
	@ApiProperty({ example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'] })
	featured_image: string[];

	@Column()
	@ApiProperty({ example: 'https://example.com/main_img.jpg' })
	main_image: string;

	@Column()
	@ApiProperty({ example: 'A+' })
	energy_class: string;

	@Column()
	@ApiProperty({ example: '90' })
	energy_index: string;
}
