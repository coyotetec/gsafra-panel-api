import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const passwordKey = process.env.PASSWORD_SECRET;
const passwordIv = process.env.PASSWORD_IV;

if (!passwordKey || !passwordIv) {
  throw new Error('Faltam variáveis ambiente');
}

const key = Buffer.from(passwordKey);
const iv = Buffer.from(passwordIv);

export function encryptPassword(password: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

export function decryptPassword(password: string) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(password, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export function validatePassword(password: string, encryptedPassword: string) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted === password;
}
