import { Injectable, PipeTransform } from '@nestjs/common';
import { CryptoService } from 'src/shared/services/cryptoHash.service';

@Injectable()
export class HashDataPipe implements PipeTransform {
 transform(value: any) {
  if (typeof value === 'object' && 'number' in value) {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
   const hashedNumber = new CryptoService().encrypt(value.number);
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return { ...value, number: hashedNumber };
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
 }
}
