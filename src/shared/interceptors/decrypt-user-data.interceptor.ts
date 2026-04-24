import {
 CallHandler,
 ExecutionContext,
 Injectable,
 NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CryptoHash } from '../utils/cryptoHash.service';
import { hashedUserCol } from '../settings';

@Injectable()
export class DecryptUserData implements NestInterceptor {
 intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
  return next.handle().pipe(
   map((response: any) => {
    const cols = hashedUserCol;
    const colsChanged: any = {};
    if (typeof response === 'object') {
     Object.keys(cols).forEach((col) => {
      if (col in response) {
       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
       const hashedData = new CryptoHash().encrypt(response[col]);
       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
       colsChanged[col] = hashedData;
      }
     });
     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
     return { ...response, ...colsChanged };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response;
   }),
  );
 }
}
