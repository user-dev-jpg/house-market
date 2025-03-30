import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAttachmentsDto {
  @ApiProperty({ example: "SliderImg1", description: "Image path" })
  @IsString()
  imgPath: string;

  @ApiProperty({ example: "Avatar1", description: "Avatar image" })
  @IsString()
  avatar: string;
}
