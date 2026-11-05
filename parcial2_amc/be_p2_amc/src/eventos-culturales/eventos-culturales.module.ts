import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoCultural } from './entities/evento-cultural.entity';
import { Recinto } from '../recintos/entities/recinto.entity';
import { EventosCulturalesService } from './eventos-culturales.service';
import { EventosCulturalesController } from './eventos-culturales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventoCultural, Recinto])],
  controllers: [EventosCulturalesController],
  providers: [EventosCulturalesService],
})
export class EventosCulturalesModule {}
