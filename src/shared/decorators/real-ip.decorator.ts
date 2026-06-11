import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const RealIp = createParamDecorator(
 (data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<Request>();

  const forwarded = request.headers['x-forwarded-for'];
  if (forwarded) {
   const forwardedStr = Array.isArray(forwarded) ? forwarded[0] : forwarded;

   return forwardedStr.split(',')[0].trim();
  }

  return (
   (request.headers['x-real-ip'] as string) ||
   request.ip ||
   request.socket?.remoteAddress ||
   'unknown'
  );
 },
);
