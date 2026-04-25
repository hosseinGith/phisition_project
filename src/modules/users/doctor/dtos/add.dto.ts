import { PartialType } from '@nestjs/swagger';
import { Users } from 'src/entitys/users.entity';

export default class AddDoctorDto extends PartialType(Users) {}
