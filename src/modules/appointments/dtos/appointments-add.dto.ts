import { IsBoolean, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import {
 StatusAppointmentsEnum,
 VisitTypeAppointmentsEnum,
} from 'src/entitys/appointments.entity';

export default class AppointmentsDtoAdd {
 @IsNumber()
 patientId: number;
 @IsNumber()
 doctorId: number;
 @IsDate()
 date: Date;
 @IsEnum(StatusAppointmentsEnum)
 status: StatusAppointmentsEnum;
 @IsEnum(VisitTypeAppointmentsEnum)
 visit_type: VisitTypeAppointmentsEnum;
 @IsString()
 symptoms: string;
 @IsBoolean()
 reminderSent: boolean;
 @IsNumber()
 hourId: number;
}
