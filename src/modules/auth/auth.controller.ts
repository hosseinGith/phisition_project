import {
 Body,
 Controller,
 Post,
 UseInterceptors,
 UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginDto from './dtos/login.dto';
import { HashUserData } from 'src/shared/pipe/hash-user-data.pipe';
import { DecryptUserData } from 'src/shared/interceptors/decrypt-user-data.interceptor';
import OtpDto from './dtos/otp.dto';

@ApiTags('Authentication')
@Controller('auth')
@UsePipes(HashUserData)
@UseInterceptors(DecryptUserData)
export class AuthController {
 constructor(private readonly authService: AuthService) {}
 @Post('login')
 signin(@Body() body: OtpDto) {
  return this.authService.login(body);
 }

 @Post('login/verify-code')
 codeOTP(@Body() body: LoginDto) {
  return this.authService.verify_otp_code(body);
 }
}
