import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventoCultural } from './entities/evento-cultural.entity';
import { Recinto } from '../recintos/entities/recinto.entity';
import { CreateEventoCulturalDto } from './dto/create-evento-cultural.dto';
import { UpdateEventoCulturalDto } from './dto/update-evento-cultural.dto';

@Injectable()
export class EventosCulturalesService {
  constructor(
    @InjectRepository(EventoCultural) private repo: Repository<EventoCultural>,
    @InjectRepository(Recinto) private recintosRepo: Repository<Recinto>,
  ) {}

  // Verifica que el recinto exista antes de guardar la llave foránea
  private async validarRecinto(idRecinto: number) {
    const existe = await this.recintosRepo.findOneBy({ id: idRecinto });
    if (!existe) throw new BadRequestException(`El recinto ${idRecinto} no existe`);
  }

  async create(dto: CreateEventoCulturalDto) {
    await this.validarRecinto(dto.idRecinto);
    return this.repo.save(this.repo.create(dto));
  }

  // Ordena por recinto (equivalente a "ordenar por nivel académico" del enunciado anterior)
  findAll() {
    return this.repo.find({
      relations: { recinto: true },
      order: { recinto: { nombre: 'ASC' }, fechaEvento: 'ASC' },
    });
  }

  async findOne(id: number) {
    const evento = await this.repo.findOne({ where: { id }, relations: { recinto: true } });
    if (!evento) throw new NotFoundException(`Evento ${id} no existe`);
    return evento;
  }

  async update(id: number, dto: UpdateEventoCulturalDto) {
    const evento = await this.findOne(id);
    if (dto.idRecinto) await this.validarRecinto(dto.idRecinto);
    delete evento.recinto; // evita que la relación cargada pise el id_recinto nuevo
    return this.repo.save(Object.assign(evento, dto));
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.softDelete(id);
    return { mensaje: `Evento ${id} eliminado` };
  }
}
