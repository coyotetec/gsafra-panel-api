export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    super.name = 'AuthError';
  }
}
