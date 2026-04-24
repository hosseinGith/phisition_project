// crypto.service.ts
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'node:crypto';
@Injectable()
export class CryptoHash {
 // این کلید باید در محیط Variables ذخیره شود.
 // برای AES-256، طول کلید باید 32 بایت باشد.
 private readonly algorithm = 'aes-256-gcm';
 private readonly secretKey: Buffer;
 private readonly iv_key: Buffer;
 constructor() {
  // NEVER hard-code this in production.
  // Use process.env.ENCRYPTION_KEY (a 64-character hex string)
  const keyHex = process.env.ENCRYPTION_KEY;
  const keyHex_iv = process.env.ENCRYPTION_KEY_IV;
  if (!keyHex || keyHex.length !== 64) {
   throw new Error(
    'Invalid ENCRYPTION_KEY length. Must be 32 bytes (64 hex chars).',
   );
  }
  if (!keyHex_iv || keyHex_iv.length !== 32) {
   throw new Error(
    'Invalid ENCRYPTION_KEY length. Must be 32 bytes (64 hex chars).',
   );
  }
  this.secretKey = Buffer.from(keyHex, 'hex');
  this.iv_key = Buffer.from(keyHex_iv, 'hex');
 }

 encrypt(text: string) {
  const cipher = createCipheriv(this.algorithm, this.secretKey, this.iv_key);

  const encrypted = Buffer.concat([
   cipher.update(text, 'utf8'),
   cipher.final(),
  ]);

  return encrypted.toString('base64');
 }

 decrypt(encryptedData: string): string {
  const decipher = createDecipheriv(
   this.algorithm,
   this.secretKey,
   this.iv_key,
  );

  const decrypted = Buffer.concat([
   decipher.update(Buffer.from(encryptedData, 'base64')),
   decipher.final(),
  ]);

  return decrypted.toString('utf8');
 }
}
