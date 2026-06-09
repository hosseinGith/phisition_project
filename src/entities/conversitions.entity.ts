import {
 Entity,
 PrimaryColumn,
 BeforeInsert,
 ManyToOne,
 OneToMany,
 Column,
} from 'typeorm';

import { Patients } from '../modules/users/patient/patients.entity';
import { Doctors } from '../modules/users/doctor/entities/doctors.entity';
import { Messages } from './messages.entity';
@Entity()
export class Conversitions {
 @PrimaryColumn()
 id!: string;
 @BeforeInsert()
 private async generateId() {
  const { nanoid } = await import('nanoid');
  this.id = nanoid();
 }
 @ManyToOne(() => Patients)
 patient!: Patients;
 @ManyToOne(() => Doctors)
 doctor!: Doctors;
 @OneToMany(() => Messages, (message) => message.conversition)
 messages!: Messages[];
 @Column()
 roomId!: string;
}
