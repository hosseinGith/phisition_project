import {
 BadRequestException,
 Injectable,
 NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { AccessType } from 'src/types';
import { Repository } from 'typeorm';
import ActiveTurn from './dtos/turn.dto';
import { Doctors } from 'src/entitys/doctors.entity';
import { DoctorHours } from 'src/entitys/doctorHours.entity';
import { Appointments } from 'src/entitys/appointments.entity';

@Injectable()
export class PatientService {
 constructor(
  @InjectRepository(Users)
  private usersRepository: Repository<Users>,
  @InjectRepository(Doctors)
  private doctors: Repository<Doctors>,
  @InjectRepository(DoctorHours)
  private doctorHours: Repository<DoctorHours>,
  @InjectRepository(Appointments)
  private appointments: Repository<Appointments>,
 ) {}

 async findActiveDoctors() {
  return await this.usersRepository.findOneBy({
   access: AccessType.DOCTOR,
   is_active: true,
  });
 }
 // public.service.ts
 async search(q: string, specialty?: string) {
  const queryBuilder = this.usersRepository
   .createQueryBuilder('users')
   .leftJoinAndSelect('users.doctor', 'doctor');

  if (q) {
   queryBuilder.andWhere(
    '(users.first_name LIKE :name OR users.last_name LIKE :name)',
    { name: `%${q}%` },
   );
  }

  if (specialty) {
   queryBuilder.andWhere('doctor.specialty = :specialty', { specialty });
  }

  // فقط کاربرانی که دکتر هستند (دکتر دارند)
  queryBuilder.andWhere('doctor.id IS NOT NULL');

  return await queryBuilder.getMany();
 }

 // taking turns
 async activeTurn(body: ActiveTurn) {
  const doctor = await this.doctors.findOneBy({ id: body.doctorId });
  if (!doctor)
   return new NotFoundException('دکتر مورد نظر پیدا نشد.', 'Doctor not found');
  const doctorHour = await this.doctorHours.findOneBy({
   id: body.hourId,
   doctor,
  });
  if (!doctorHour)
   return new NotFoundException(
    'ساعت مورد نظر پیدا نشد.',
    'Doctor hour not found',
   );
  const appointment = await this.appointments.findOneBy({
   id: body.hourId,
   doctor,
   appointment_date: body.date,
  });
  if (appointment)
   return new BadRequestException(
    'در ساعت انتخاب شده دکتر وقت آزاد ندارد.لطفا ساعت دیگری انتخاب کنید.',
    'appointment not found',
   );

  const new_appointment = this.appointments.create({
   appointment_date: body.date,
   doctor,
   hour: doctorHour,
  });
  return await this.appointments.save(new_appointment);
 }
}

