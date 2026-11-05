import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';
import { EstadoEvento } from '../entities/evento-cultural.entity';

export class CreateEventoCulturalDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idRecinto: number;

  @ApiProperty({ example: 'Noche de Folklore', maxLength: 150 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @ApiProperty({ example: 'Los Kjarkas', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  artistaPrincipal: string;

  @ApiProperty({ example: 120 })
  @IsInt()
  @Min(1)
  duracionMinutos: number;

  @ApiProperty({ example: 50.5 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precioEntrada: number;

  @ApiProperty({ example: '2026-12-15', description: 'Formato AAAA-MM-DD' })
  @IsDateString()
  fechaEvento: string;

  @ApiProperty({ enum: EstadoEvento, example: EstadoEvento.PROGRAMADO })
  @IsEnum(EstadoEvento)
  estado: EstadoEvento;
}
