import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
enum UseTypeEnum {
 CONVERSITION = 'conversition',
 ADMINUPLOAD = 'adminUpload',
}

@Entity()
export class Files {
 @PrimaryGeneratedColumn()
 id: number;
 @Column()
 url: string;
 @Column({
  type: 'enum',
  enum: UseTypeEnum,
  enumName: 'UseType',
  default: UseTypeEnum.CONVERSITION,
 })
 @Column()
 use_type: string;
 @Column()
 type: string;
 @ManyToOne(() => Users, (user) => user)
 user: Users;
}
