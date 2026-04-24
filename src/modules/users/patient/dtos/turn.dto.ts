import { IsDate, IsNumber } from 'class-validator';

export default class ActiveTurn {
 @IsNumber()
 hourId: number;
 @IsNumber()
 doctorId: number;
 @IsDate()
 date: Date;
}
