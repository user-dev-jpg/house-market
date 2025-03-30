import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString } from "class-validator";

export class CreatePropDetailsDto {
  @ApiProperty({ example: 2, description: "Number of bathrooms" })
  @IsInt()
  baths: number;

  @ApiProperty({ example: 3, description: "Number of bedrooms" })
  @IsInt()
  beds: number;

  @ApiProperty({ example: 2700, description: "Property price" })
  @IsInt()
  price: number;

  @ApiProperty({ example: 1500, description: "Size of the property in square feet" })
  @IsInt()
  size: number;

  @ApiProperty({ example: 200, description: "Size of the garage in square feet" })
  @IsInt()
  garageSize: number;

  @ApiProperty({ example: 1, description: "Number of garages" })
  @IsInt()
  garages: number;

  @ApiProperty({ example: "2021-01-09", description: "Year the property was built" })
  @IsDateString()
  yearBuild: string;

  @ApiProperty({ example: "For Sale", description: "Status of the property" })
  @IsString()
  status: string;

  @ApiProperty({ example: "Apartment", description: "Type of the property" })
  @IsString()
  type: string;
}
