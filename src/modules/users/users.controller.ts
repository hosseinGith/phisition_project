import {
 Body,
 Controller,
 Delete,
 Get,
 Param,
 Patch,
 Post,
 UseGuards,
 UseInterceptors,
 UsePipes,
} from '@nestjs/common';
import { AdminAddUser } from './dtos/user-add.dto';
import { UsersService } from './users.service';
import { PasswordPipe } from 'src/shared/pipe/password.pipe';
import { PasswordInterceptor } from 'src/shared/interceptors/password.interceptor';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AccessGuard } from 'src/shared/guards/access.guard';
import { AccessType } from 'src/types';
import UserUpdateDto from './dtos/user-update.dto';
import { HashUserData } from 'src/shared/pipe/hash-user-data.pipe';

@Controller('users')
@ApiBearerAuth()
@UseInterceptors(PasswordInterceptor)
@UseGuards(AuthGuard, new AccessGuard([AccessType.ADMIN]))
@UsePipes(HashUserData)
export class UsersController {
 constructor(private readonly users: UsersService) {}
 @Get(':id')
 findOne(@Param('id') id: number) {
  return this.users.get(id);
 }
 @Get()
 findAll() {
  return this.users.get();
 }
 @Post()
 add(@Body(PasswordPipe) body: AdminAddUser) {
  return this.users.add(body);
 }
 @Patch(':id')
 update(@Param('id') id: number, @Body(PasswordPipe) body: UserUpdateDto) {
  return this.users.update(id, body);
 }
 @Delete(':id')
 delete(@Param('id') id: number) {
  return this.users.delete(id);
 }
}
