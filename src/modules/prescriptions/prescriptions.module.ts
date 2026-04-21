import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { Prescriptions } from 'src/entitys/prescriptions.entity';

@Module({
 imports: [TypeOrmModule.forFeature([Prescriptions, Users])],
 providers: [PrescriptionsService],
 controllers: [PrescriptionsController],
})
export class PrescriptionsModule {}
