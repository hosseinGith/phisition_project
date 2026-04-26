import {
 BadRequestException,
 Injectable,
 NotFoundException,
 UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctors } from 'src/entitys/doctors.entity';
import AddDoctorDto from './dtos/add.dto';
import find from 'src/shared/utils/find';
import type { Request } from 'express';
import getDataFromUserToken from 'src/shared/utils/getDataFromUserToken';
import { Users } from 'src/entitys/users.entity';
import { Patients } from 'src/entitys/patients.entity';
import { Appointments } from 'src/entitys/appointments.entity';

@Injectable()
export class DoctorService {
 constructor(
  @InjectRepository(Doctors)
  private readonly doctors: Repository<Doctors>,
  @InjectRepository(Users)
  private readonly users: Repository<Users>,
  @InjectRepository(Patients)
  private readonly patients: Repository<Patients>,
  @InjectRepository(Appointments)
  private readonly appointments: Repository<Appointments>,
 ) {}

 async get(id?: string) {
  return await find<Doctors>(this.doctors, id, ['doctorHours']);
 }
 async getUserData(request: Request) {
  const token = getDataFromUserToken(request);
  if (!token) throw new UnauthorizedException();
  const user = await this.users.findOne({
   where: { id: token.id },
   relations: ['doctor'],
  });

  if (!user) throw new NotFoundException();
  return user;
 }
 async my_appointments(request: Request) {
  const token = getDataFromUserToken(request);
  if (!token) throw new UnauthorizedException();
  const user = await this.users.findOne({
   where: { id: token.id },
   relations: ['doctor'],
  });
  if (!user) throw new UnauthorizedException();
  const patients = await this.appointments.findOne({
   where: { doctor: { id: user.doctor.id } },
   relations: ['patients', 'prescriptions'],
   select: {
    appointment_date: true,
    created_at: true,
    hour: true,
    id: true,
    patient: {
     allergies: true,
     blood_type: true,
     chronic_diseases: true,
     emergency_contact_name: true,
     emergency_contact_phone: true,
     id: true,
     medical_record_number: true,
     user: {
      first_name: true,
      last_name: true,
     },
    },
   },
  });
  return patients;
 }

 async update(id: string, body: AddDoctorDto) {
  if (!id) throw new BadRequestException('', 'id');

  const doctor = await this.doctors.findOneBy({ id });
  const fieldsToUpdate = Object.keys(body).length;

  if (fieldsToUpdate === 0) {
   throw new BadRequestException('هیچ فیلدی برای به‌روزرسانی ارسال نشده است.');
  }

  if (doctor)
   return (await this.doctors.update({ id: doctor.id }, body)).affected === 1;
  else throw new NotFoundException();
 }
}
