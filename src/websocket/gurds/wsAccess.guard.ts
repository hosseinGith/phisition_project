import {
 CanActivate,
 ExecutionContext,
 ForbiddenException,
 Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';
import { AccessType } from 'src/types';

@Injectable()
export class wsAccess implements CanActivate {
 constructor(private readonly reflector: Reflector) {}
 canActivate(context: ExecutionContext): boolean {
  const client: Socket = context.switchToWs().getClient();

  const requiredAccess = this.reflector.get<AccessType[]>(
   'accessTypes',
   context.getHandler(),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const userAccess = client['userAccess'];

  if (
   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
   requiredAccess?.includes(userAccess) ||
   userAccess === AccessType.SYSTEM_ADMIN
  )
   return true;
  client.emit('error', {
   status: 'access',
  });
  throw new ForbiddenException();
 }
}
