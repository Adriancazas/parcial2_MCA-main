import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recinto } from './entities/recinto.entity';
import { RecintosService } from './recintos.service';
import { RecintosController } from './recintos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Recinto])],
  controllers: [RecintosController],
  providers: [RecintosService],
  exports: [RecintosService],
})
export class RecintosModule {}
