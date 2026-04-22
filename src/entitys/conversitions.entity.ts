import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Users } from './users.entity';
import { Patients } from './patients.entity';
import { Doctors } from './doctors.entity';
import { Messages } from './messages.entity';
@Entity()
export class Conversitions {
 @PrimaryGeneratedColumn()
 id: number;
 @ManyToOne(() => Users, (user) => user.conversition)
 creator: Users;
 @ManyToOne(() => Patients, (patient) => patient.conversitions)
 patient: Patients;
 @ManyToOne(() => Doctors, (doctor) => doctor.conversitions)
 doctor: Doctors;
 @OneToMany(() => Messages, (message) => message.conversition)
 messages: Messages[];
}
