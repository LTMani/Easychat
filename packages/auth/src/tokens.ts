import * as jwt from 'jsonwebtoken';
import { UserSessionPayload } from '@easychat/shared';

export interface TokenOptions {
  secret: string;
  expiresIn: string;
}

export function generateToken(payload: UserSessionPayload, options: TokenOptions): string {
  return jwt.sign(payload, options.secret, {
    expiresIn: options.expiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function verifyToken(token: string, secret: string): UserSessionPayload {
  return jwt.verify(token, secret) as UserSessionPayload;
}
