import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateRecintoDto {
  @ApiProperty({ example: 'Teatro Gran Mariscal', maxLength: 100 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @ApiProperty({ example: 'Sucre', maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ciudad: string;

  @ApiPropertyOptional({ example: 800 })
  @IsOptional()
  @IsInt()
  @Min(1)
  aforoMaximo?: number;
}
