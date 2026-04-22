import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 OneToMany,
 OneToOne,
 JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Rates } from './rates.entity';
import { Prescriptions } from './prescriptions.entity';
import { Appointments } from './appointments.entity';
import { AuditLogs_Medical } from './auditLogs_Medical.entity';
import { Conversitions } from './conversitions.entity';
import { MedicalRecords } from './medicalRecords.entity';

@Entity()
export class Patients {
 @PrimaryGeneratedColumn()
 id: number;
 // ارجاع به Users
 @OneToMany(() => Rates, (rate) => rate.patient)
 rates: Rates[];
 @OneToMany(() => Prescriptions, (prescription) => prescription.patient)
 prescriptions: Prescriptions[];
 @OneToMany(() => Appointments, (appointment) => appointment.patient)
 appointments: Appointments[];
 @OneToMany(
  () => AuditLogs_Medical,
  (auditLogs_Medical) => auditLogs_Medical.patient,
 )
 auditLogs_Medical: AuditLogs_Medical[];
 @OneToMany(() => Conversitions, (conversition) => conversition.patient)
 conversitions: Conversitions[];
 @OneToMany(() => MedicalRecords, (medicalRecord) => medicalRecord.patient)
 medicalRecords: MedicalRecords[];

 @OneToOne(() => Users, (user) => user.patient)
 @JoinColumn()
 user: Users;
 // شماره پرونده (یکتا، مثل MR-۱۴۰۴-۱۲۳۴)
 @Column({ unique: true, default: () => 'UUID()' })
 medical_record_number: string;
 // گروه خونی
 @Column()
 blood_type: string;
 // حساسیت‌های دارویی/غذایی (JSON)
 @Column()
 allergies: string;
 // بیماری‌های مزمن
 @Column()
 chronic_diseases: string;
 // نام شخص اضطراری
 @Column()
 emergency_contact_name: string;
 // تلفن شخص اضطراری (رمزگذاری شده)
 @Column()
 emergency_contact_phone: string;
 // شرکت بیمه
 @Column()
 insurance_company: string;
}
