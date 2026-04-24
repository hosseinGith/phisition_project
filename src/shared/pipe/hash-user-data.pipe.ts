import { Injectable, PipeTransform } from '@nestjs/common';
import { CryptoHash } from 'src/shared/utils/cryptoHash.service';
import { hashedUserCol } from '../settings';

@Injectable()
export class HashUserData implements PipeTransform {
 transform(value: any) {
  const cols = hashedUserCol;
  if (typeof value === 'object') {
   cols.forEach((col) => {
    try {
     if (
      col in value ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      col in value['user'] ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      col in value['patient'] ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      col in value['doctor']
     ) {
      const hashedData = new CryptoHash().encrypt(
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
       value[col] ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value['user'][col] ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value['patient'][col] ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value['doctor'][col],
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (value[col])
       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
       value[col] = hashedData;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else if (value['user'][col])
       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
       value['user'][col] = hashedData;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else if (value['patient'][col])
       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
       value['patient'][col] = hashedData;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else if (value['doctor'][col])
       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
       value['doctor'][col] = hashedData;
     }
    } catch {
     /* empty */
    }
   });

   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return { ...value };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return value;
 }
}
