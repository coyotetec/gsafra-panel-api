import { Request, Response } from 'express';
import { loginSchema } from '../schemas/authSchemas';
import { makeLogin } from '../useCases/auth/makeLogin';

class AuthController {
  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const response = await makeLogin(data);

    return res.json(response);
  }
}

export default new AuthController();
