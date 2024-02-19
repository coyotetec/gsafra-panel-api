import { userRoleType } from '../user';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        role: userRoleType;
      };
    }
  }
}
