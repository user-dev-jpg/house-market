import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateLocationDto {
  @ApiProperty({ example: "329 Main Street", description: "Full address" })
  @IsString()
  address: string;

  @ApiProperty({ example: "Main St", description: "Street name" })
  @IsString()
  street: string;

  @ApiProperty({ example: "San Francisco", description: "City name" })
  @IsString()
  city: string;

  @ApiProperty({ example: "California", description: "State name" })
  @IsString()
  state: string;

  @ApiProperty({ example: 94105, description: "Zip code" })
  @IsInt()
  zipcode: number;

  @ApiProperty({ example: "Downtown", description: "Area name" })
  @IsString()
  area: string;

  @ApiProperty({ example: "USA", description: "Country name" })
  @IsString()
  country: string;
}
