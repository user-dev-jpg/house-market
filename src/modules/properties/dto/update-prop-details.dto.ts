import { PartialType } from '@nestjs/mapped-types';
import { CreatePropDetailsDto } from './create-prop-details.dto';


export class UpdatePropDetailsDto extends PartialType(CreatePropDetailsDto) { }