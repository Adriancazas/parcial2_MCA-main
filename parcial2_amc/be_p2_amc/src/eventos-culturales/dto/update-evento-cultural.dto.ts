import { PartialType } from '@nestjs/swagger';
import { CreateEventoCulturalDto } from './create-evento-cultural.dto';

export class UpdateEventoCulturalDto extends PartialType(CreateEventoCulturalDto) {}
