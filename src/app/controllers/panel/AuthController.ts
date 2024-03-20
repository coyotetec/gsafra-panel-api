import { Request, Response } from 'express';
import { makeLogin } from '../../useCases/panel/auth/makeLogin';
import { loginSchema } from '../../schemas/authSchemas';

class AuthController {
  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const response = await makeLogin(data);

    return res.json(response);
  }
}

export default new AuthController();
