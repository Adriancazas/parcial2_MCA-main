import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { EventoCultural } from '../../eventos-culturales/entities/evento-cultural.entity';

@Entity('recintos')
export class Recinto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  ciudad: string;

  @Column({ name: 'aforo_maximo', type: 'int', nullable: true })
  aforoMaximo: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToMany(() => EventoCultural, (evento) => evento.recinto)
  eventos: EventoCultural[];
}
