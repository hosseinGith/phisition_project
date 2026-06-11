import {
 Entity,
 PrimaryColumn,
 BeforeInsert,
 Column,
 CreateDateColumn,
 ManyToOne,
 OneToMany,
} from 'typeorm';

import { Patients } from '../../patient/entities/patients.entity';
import { Doctors } from '../../doctor/entities/doctors.entity';
import { Prescriptions } from '../../prescriptions/entities/prescriptions.entity';
export enum AppointmentStatusEnum {
 PENDING = 'pending',
 ACCEPTED = 'accepted',
 COMPLETED = 'completed',
 CANCELLED = 'cancelled',
 // When the patient does not appointment
 NOSHOW = 'noShow',
}
export enum VisitTypeAppointmentsEnum {
 INPERSON = 'inPerson',
 ONLINE = 'online',
}

@Entity()
export class Appointments {
 @PrimaryColumn()
 id!: string;
 @BeforeInsert()
 private async generateId() {
  const { nanoid } = await import('nanoid');
  this.id = nanoid();
 }
 // ارجاع به Patients

 @ManyToOne(() => Patients, (patient) => patient.appointments)
 patient!: Patients;
 // ارجاع به Doctors
 @ManyToOne(() => Doctors)
 doctor!: Doctors;
 @OneToMany(() => Prescriptions, (prescription) => prescription.appointment)
 prescriptions!: Prescriptions[];

 // تاریخ نوبت
 @Column({ type: 'date' })
 appointment_date!: Date;
 // ساعت نوبت

 @Column({
  type: 'enum',
  enum: AppointmentStatusEnum,
  default: AppointmentStatusEnum.PENDING,
 })
 status!: AppointmentStatusEnum;
 @Column({ nullable: true })
 cancelReason?: string;
 @Column({
  type: 'enum',
  enum: VisitTypeAppointmentsEnum,
 })
 visit_type!: VisitTypeAppointmentsEnum;
 // شرح علائم (قبل از ویزیت)
 @Column()
 symptoms!: string;
 // زمان ثبت نوبت
 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at!: Date;
 // یادآوری ارسال شده؟
 @Column({ type: 'boolean', default: false })
 reminder_sent!: boolean;
}
