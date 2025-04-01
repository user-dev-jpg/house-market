import { PartialType } from '@nestjs/mapped-types';
import { CreateAttachmentsDto } from './create-attachments-dto';

export class UpdateAttachmentDto extends PartialType(CreateAttachmentsDto) { }