// crypto.service.ts - نسخه AES-CBC
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'node:crypto';

@Injectable()
export class CryptoHash {
 private readonly algorithm = 'aes-256-cbc'; // تغییر از gcm به cbc
 private readonly secretKey: Buffer;
 private readonly iv: Buffer;

 constructor() {
  const keyHex = process.env.ENCRYPTION_KEY;
  if (!keyHex || keyHex.length !== 64) {
   throw new Error(
    'Invalid ENCRYPTION_KEY length. Must be 32 bytes (64 hex chars)',
   );
  }
  const iv_key = process.env.ENCRYPTION_KEY_IV;
  if (!iv_key || iv_key.length !== 32) {
   throw new Error(
    'Invalid ENCRYPTION_KEY_IV length. Must be 32 bytes (32 hex chars)',
   );
  }
  this.secretKey = Buffer.from(keyHex, 'hex');
  this.iv = Buffer.from(iv_key, 'hex');
 }

 encrypt(text: string): string {
  const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
 }

 decrypt(encrypted: string): string {
  const decipher = createDecipheriv(this.algorithm, this.secretKey, this.iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
 }
}
