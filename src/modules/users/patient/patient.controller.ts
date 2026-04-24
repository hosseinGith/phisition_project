import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import ActiveTurn from './dtos/turn.dto';

@Controller('patient')
export class PatientController {
 constructor(private readonly service: PatientService) {}

 @Get('/active_doctors')
 findActiveDoctors() {
  return this.service.findActiveDoctors();
 }
 @Get('/search/doctors')
 search(@Query('q') q: string, @Query('specialty') specialty?: string) {
  return this.service.search(q, specialty);
 }
 @Post('/turn/active')
 activeTurn(@Body() body: ActiveTurn) {
  return this.service.activeTurn(body);
 }
}
