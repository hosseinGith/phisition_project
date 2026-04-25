import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctors } from './doctors.entity';
import { Matches } from 'class-validator';

@Entity()
export class DoctorHours {
 @PrimaryGeneratedColumn()
 id: number;
 @ManyToOne(() => Doctors, (doctor) => doctor.doctorHours)
 doctor: Doctors;
 @Column()
 @Matches(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, {
  message: 'ساعت باید در فرمت HH:MM باشد',
 })
 hour: string;
}
