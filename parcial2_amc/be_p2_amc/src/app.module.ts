import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecintosModule } from './recintos/recintos.module';
import { EventosCulturalesModule } from './eventos-culturales/eventos-culturales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'usrparcial2',
      password: 'P4rc14L2-2026',
      database: 'parcial2_amc',
      autoLoadEntities: true,
      synchronize: true, // crea/actualiza las tablas solo (válido para el parcial)
    }),
    RecintosModule,
    EventosCulturalesModule,
  ],
})
export class AppModule {}
