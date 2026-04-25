import { IsDate, IsEnum, IsNumber } from 'class-validator';
import { VisitTypeAppointmentsEnum } from 'src/entitys/appointments.entity';

export default class ActiveTurn {
 @IsNumber()
 hourId: number;
 @IsNumber()
 doctorId: number;
 @IsDate()
 date: Date;
 @IsEnum(VisitTypeAppointmentsEnum)
 visit_type: VisitTypeAppointmentsEnum;
}
