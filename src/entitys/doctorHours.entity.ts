import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctors } from './doctors.entity';

@Entity()
export class DoctorHours {
 @PrimaryGeneratedColumn()
 id: number;
 @ManyToOne(() => Doctors, (doctor) => doctor.doctorHours)
 doctor: Doctors;
 @Column()
 hour: string;
}
