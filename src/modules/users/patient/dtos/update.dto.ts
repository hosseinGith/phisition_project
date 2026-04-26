import { OmitType, PartialType } from '@nestjs/swagger';
import { Patients } from 'src/entitys/patients.entity';

export default class PatientUpdateDto extends PartialType(
 OmitType(Patients, ['id', 'user']),
) {}
