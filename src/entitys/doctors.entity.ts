import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 OneToMany,
 ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { Rates } from './rates.entity';

@Entity()
export class Doctors {
 @PrimaryGeneratedColumn()
 id: number;

 @ManyToOne(() => Users, (user) => user.doctors)
 user: Users;
 @OneToMany(() => Rates, (rate) => rate.doctor)
 rates: Rates[];
 // ارجاع به Users
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
