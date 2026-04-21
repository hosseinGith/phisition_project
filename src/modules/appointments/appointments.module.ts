import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from 'src/entitys/appointments.entity';
import { Users } from 'src/entitys/users.entity';

@Module({
 imports: [TypeOrmModule.forFeature([Appointments, Users])],
 controllers: [AppointmentsController],
 providers: [AppointmentsService],
})
export class AppointmentsModule {}
