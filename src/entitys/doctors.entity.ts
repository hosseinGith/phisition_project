import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 OneToOne,
 JoinColumn,
 OneToMany,
} from 'typeorm';
import { Users } from './users.entity';
import { DoctorHours } from './doctorHours.entity';

@Entity()
export class Doctors {
 @PrimaryGeneratedColumn()
 id: number;

 // ارجاع به Users
 @OneToOne(() => Users, (user) => user.doctor)
 @JoinColumn()
 user: Users;
 @OneToMany(() => DoctorHours, (doctorHour) => doctorHour.doctor)
 doctorHours: DoctorHours[];
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
}
