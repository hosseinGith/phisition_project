import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccessType } from 'src/types';

export default class UserDtoAdd {
 @IsOptional()
 firstname?: string;
 @IsOptional()
 lastname?: string;

 @IsString()
 @IsNotEmpty()
 username: string;
 @IsString()
 @IsNotEmpty()
 password: string;
 @IsNotEmpty()
 @IsEnum(AccessType)
 access: AccessType;
 @IsNotEmpty()
 @IsString({
  validateIf: (ob, val) => {
   console.log(String(val).length > 9);

   return String(val).length > 9;
  },
 })
 national_id: string;
}

