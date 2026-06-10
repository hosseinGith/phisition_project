import { OmitType, PartialType } from '@nestjs/swagger';
import { Patients } from 'src/modules/users/patient/entities/patients.entity';

export default class PatientUpdateDto extends PartialType(
 OmitType(Patients, ['id', 'user']),
) {}
