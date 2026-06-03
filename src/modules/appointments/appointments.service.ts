import {
 BadRequestException,
 Injectable,
 NotFoundException,
} from '@nestjs/common';
import { FindOptionsSelect, Repository } from 'typeorm';
import { Appointments } from 'src/entitys/appointments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import AppointmentsDtoAdd from './dtos/appointments-add.dto';
import AppointmentsUpdateDto from './dtos/appointments-update.dto';

import { DoctorService } from '../users/doctor/doctor.service';
import { PatientService } from '../users/patient/patient.service';
import { HoursService } from '../users/doctor/hours/hours.service';

@Injectable()
export class AppointmentsService {
 constructor(
  @InjectRepository(Appointments)
  private appointments: Repository<Appointments>,
  private readonly doctorsService: DoctorService,
  private readonly patientsService: PatientService,
  private readonly doctorHoursService: HoursService,
 ) {}
 async findOne(id?: string) {
  const res = await this.appointments.findOneBy({ id });
  if (res) return res;
  throw new NotFoundException();
 }
 async findAll(select?: FindOptionsSelect<Appointments>) {
  const res = await this.appointments.find({ select: select });
  return res;
 }
 async create(body: AppointmentsDtoAdd) {
  const [patient, doctor] = await Promise.all([
   this.patientsService.findOne(body.patientId),
   this.doctorsService.findOne(body.doctorId),
  ]);
  const doctorHour = await this.doctorHoursService.findOne(body.hourId, {
   doctor: { id: doctor.id },
  });

  const dateOnly = new Date(body.date).toISOString().split('T')[0];

  const appointment = await this.appointments.findOneBy({
   doctor: { id: doctor.id },
   appointment_date: new Date(dateOnly),
   hour: { id: doctorHour.id },
  });

  if (appointment)
   throw new BadRequestException(
    'در ساعت انتخاب شده دکتر وقت آزاد ندارد.لطفا ساعت دیگری انتخاب کنید.',
    'Hour problem',
   );

  const newAppointment = this.appointments.create({
   ...body,
   appointment_date: dateOnly,
   doctor: { id: doctor.id },
   patient: { id: patient.id },
   hour: { id: body.hourId },
   status: body.status,
   visit_type: body.visit_type,
   symptoms: body.symptoms,
   reminder_sent: Boolean(body.reminderSent),
  });
  return await this.appointments.save(newAppointment);
 }
 async update(id: string, body: AppointmentsUpdateDto) {
  const user = await this.appointments.findOneBy({ id });
  const fieldsToUpdate = Object.keys(body).length;

  if (fieldsToUpdate === 0) {
   throw new BadRequestException('هیچ فیلدی برای به‌روزرسانی ارسال نشده است.');
  }

  if (user)
   return (
    (await this.appointments.update({ id: user.id }, body)).affected === 1
   );
  throw new NotFoundException();
 }
 async remove(id: string) {
  const res = await this.appointments.delete({ id });
  if (!res.affected) throw new NotFoundException();
  return { message: 'نوبت با موفقیت حذف شد.' };
 }
}
