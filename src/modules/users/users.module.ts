import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';

@Module({
 imports: [TypeOrmModule.forFeature([Users]), PatientModule, DoctorModule],
 controllers: [UsersController, PatientController, DoctorController],
 providers: [UsersService, PatientService, DoctorService],
 exports: [UsersService],
})
export class UsersModule {}
