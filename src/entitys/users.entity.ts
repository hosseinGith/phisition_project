import { IsEnum } from 'class-validator';
import { AccessType } from 'src/types';
import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 OneToOne,
} from 'typeorm';
import { Doctors } from './doctors.entity';
import { Patients } from './patients.entity';

@Entity()
export class Users {
 @PrimaryGeneratedColumn()
 id: number;
 @Column({ unique: true })
 number: string;
 @OneToOne(() => Doctors, (doctor) => doctor.user)
 doctor: Doctors;
 @OneToOne(() => Patients, (patient) => patient.user)
 patient: Patients;
 @Column({ nullable: true })
 first_name: string;
 @Column({ nullable: true })
 last_name: string;
 @Column({ length: 10, nullable: true, unique: true })
 national_id: string;
 @Column({ nullable: true })
 @IsEnum(AccessType)
 access: AccessType;
 @Column({ default: false, type: 'boolean' })
 is_active: boolean;
 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
 created_at: Date;
}
