import {
 BadRequestException,
 Injectable,
 NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctors } from 'src/entitys/doctors.entity';
import AddDoctorDto from './dtos/add.dto';
import find from 'src/shared/utils/find';

@Injectable()
export class DoctorService {
 constructor(
  @InjectRepository(Doctors)
  private readonly doctors: Repository<Doctors>,
 ) {}

 async get(id?: number) {
  return await find<Doctors>(this.doctors, id, ['doctorHours']);
 }

 async update(id: number, body: AddDoctorDto) {
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
