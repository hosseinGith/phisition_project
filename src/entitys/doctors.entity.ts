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
import { MedicalRecords } from './medicalRecords.entity';
import { Prescriptions } from './prescriptions.entity';
import { Appointments } from './appointments.entity';
import { Conversitions } from './conversitions.entity';

@Entity()
export class Doctors {
 @PrimaryGeneratedColumn()
 id: number;

 // ارجاع به Users
 @OneToOne(() => Users, (user) => user.doctor)
 @JoinColumn()
 user: Users;
 // ارجاع به rates
 @OneToMany(() => Rates, (rate) => rate.doctor)
 rates: Rates[];
 @OneToMany(() => Prescriptions, (prescription) => prescription.doctor)
 prescriptions: Prescriptions[];
 @OneToMany(() => MedicalRecords, (medicalRecord) => medicalRecord.doctor)
 medicalRecords: MedicalRecords[];
 @OneToMany(() => Appointments, (appointment) => appointment.doctor)
 appointments: Appointments[];
 @OneToMany(() => Conversitions, (conversition) => conversition.doctor)
 conversitions: Conversitions[];

 // تخصص (قلب، پوست، داخلی، ...)
 @Column()
 specialty: string;
 // شماره نظام پزشکی
 @Column()
 medical_license_number: string;
 // هزینه ویزیت
 @Column()
 consultation_fee: string;
 // بیوگرافی
 @Column()
 bio: string;
 // امتیاز از بیماران (۱ تا ۵)
 @Column()
 rating: string;
 // ساعات کاری هفتگی
 @Column()
 work_hours: string;
}
