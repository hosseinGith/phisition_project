import { forwardRef, Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescriptions } from 'src/modules/prescriptions/entities/prescriptions.entity';
import { UsersModule } from '../users/users.module';
import { CryptoService } from 'src/shared/services/cryptoHash.service';

@Module({
 imports: [
  TypeOrmModule.forFeature([Prescriptions]),
  forwardRef(() => UsersModule),
 ],
 providers: [PrescriptionsService, CryptoService],
 controllers: [PrescriptionsController],
 exports: [PrescriptionsService],
})
export class PrescriptionsModule {}
