import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OtpCodes {
 @PrimaryGeneratedColumn()
 id: number;
 @Column({ length: process.env.OTP_code_length })
 code: string;
 @Column()
 number: string;
 @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime' })
 created_at: Date;
}
