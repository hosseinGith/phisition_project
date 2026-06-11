import {
 Body,
 Controller,
 Get,
 NotFoundException,
 Param,
 Patch,
 Query,
 Req,
 UseGuards,
 UseInterceptors,
 UsePipes,
} from '@nestjs/common';
import { DoctorService } from './services/doctor.service';
import AddDoctorDto from './dto/add.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AccessType } from 'src/types';
import { HashUserData } from 'src/shared/pipes/hash-user-data.pipe';
import { DecryptUserData } from 'src/shared/interceptors/decrypt-user-data.interceptor';
import type { Request } from 'express';
import { Access } from 'src/shared/decorators/access.decorator';
import { AccessGuard } from 'src/shared/guards/access.guard';
import SkipAuth from '../../shared/decorators/skip-auth.decorator';
import { DoctorsAppointmentService } from './services/doctors-appointments.service';
import { UpdateDoctorsAppointments } from './dto/update-doctors-appointments.dto';
import { AuditLogInterceptor } from './interceptors/log.interceptor';

@Controller('/api/doctor')
@UsePipes(HashUserData)
@UseInterceptors(DecryptUserData)
@ApiBearerAuth()
@Access(AccessType.DOCTOR)
@UseGuards(AuthGuard, AccessGuard)
export class DoctorController {
 constructor(
  private readonly mainService: DoctorService,
  private readonly doctorAppointmentsService: DoctorsAppointmentService,
 ) {}
 //  doctor access
 @Get('/profile')
 getProfile(@Req() request: Request) {
  if (!request.user?.id) throw new NotFoundException();
  return this.mainService.getProfile(request.user.id);
 }
 @Get(':id')
 findOne(@Param('id') id: string) {
  return this.mainService.findOne({ id });
 }
 @Patch(':id')
 update(@Param() id: string, @Body() body: AddDoctorDto) {
  return this.mainService.update(id, body);
 }
 // doctor appointments control
 @ApiTags('Doctor-appointments')
 @Get('/appointments/:id')
 getDoctorAppointment(@Param('id') id: string, @Req() request: Request) {
  return this.doctorAppointmentsService.findOne(id, request.user.id);
 }
 @ApiTags('Doctor-appointments')
 @UseInterceptors(AuditLogInterceptor)
 @Get('/appointments/')
 getDoctorAppointments(@Req() request: Request) {
  return this.doctorAppointmentsService.getDoctorAppointment(request.user.id);
 }
 // change appointment status
 @ApiTags('Doctor-appointments')
 @UseInterceptors(AuditLogInterceptor)
 @Patch('/appointments/:id')
 updateAppointmentStatus(
  @Param('id') id: string,
  @Body() body: UpdateDoctorsAppointments,
  @Req() request: Request,
 ) {
  return this.doctorAppointmentsService.update(id, body, request.user.id);
 }

 //  public access
 @ApiTags('Doctor-public')
 @SkipAuth()
 @Get('/public/search')
 search(@Query('q') q?: string, @Query('specialty') specialty?: string) {
  return this.mainService.searchDoctors(q, specialty);
 }
 @ApiTags('Doctor-public')
 @SkipAuth()
 @Get('/public/specialties')
 specialties() {
  return this.mainService.getAllSpecialties();
 }
}
