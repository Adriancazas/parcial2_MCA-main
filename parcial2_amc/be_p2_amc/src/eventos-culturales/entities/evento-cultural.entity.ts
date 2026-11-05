import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Recinto } from '../../recintos/entities/recinto.entity';

export enum EstadoEvento {
  PROGRAMADO = 'Programado',
  AGOTADO = 'Agotado',
  CANCELADO = 'Cancelado',
}

@Entity('eventos_culturales')
export class EventoCultural {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_recinto', type: 'int' })
  idRecinto: number;

  @ManyToOne(() => Recinto, (recinto) => recinto.eventos, { nullable: false })
  @JoinColumn({ name: 'id_recinto' })
  recinto: Recinto;

  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ name: 'artista_principal', type: 'varchar', length: 100 })
  artistaPrincipal: string;

  @Column({ name: 'duracion_minutos', type: 'int' })
  duracionMinutos: number;

  // decimal llega como string desde pg; el transformer lo devuelve como número
  @Column({
    name: 'precio_entrada',
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  precioEntrada: number;

  @Column({ name: 'fecha_evento', type: 'date' })
  fechaEvento: string;

  @Column({ type: 'varchar', length: 20 })
  estado: EstadoEvento;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}
