import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventosCulturalesService } from './eventos-culturales.service';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';

@ApiTags('eventos-culturales')
@Controller('eventos-culturales')
export class EventosCulturalesController {
  constructor(private readonly service: EventosCulturalesService) {}

  @Post()
  create(@Body() dto: CreateEventoCulturalDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventoCulturalDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
