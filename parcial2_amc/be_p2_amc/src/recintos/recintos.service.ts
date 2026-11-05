import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recinto } from './entities/recinto.entity';
import { CreateRecintoDto } from './dto/create-recinto.dto';
import { UpdateRecintoDto } from './dto/update-recinto.dto';

@Injectable()
export class RecintosService {
  constructor(@InjectRepository(Recinto) private repo: Repository<Recinto>) {}

  create(dto: CreateRecintoDto) {
    return this.repo.save(this.repo.create(dto));
  }

  findAll() {
    return this.repo.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number) {
    const recinto = await this.repo.findOneBy({ id });
    if (!recinto) throw new NotFoundException(`Recinto ${id} no existe`);
    return recinto;
  }

  async update(id: number, dto: UpdateRecintoDto) {
    const recinto = await this.findOne(id);
    return this.repo.save(Object.assign(recinto, dto));
  }

  // Eliminación lógica: llena fecha_eliminacion, no borra la fila
  async remove(id: number) {
    await this.findOne(id);
    await this.repo.softDelete(id);
    return { mensaje: `Recinto ${id} eliminado` };
  }
}
