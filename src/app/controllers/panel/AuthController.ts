import { Request, Response } from 'express';
import { makeLogin } from '../../useCases/panel/auth/makeLogin';
import {
  loginSchema,
  requestResetSchema,
  userStorePasswordSchema,
} from '../../schemas/authSchemas';
import { createPassword } from '../../useCases/panel/auth/createPassword';
import { requestPasswordReset } from '../../useCases/panel/auth/requestPasswordReset';
import { resetPassword } from '../../useCases/panel/auth/resetPassword';

class AuthController {
  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const response = await makeLogin(data);

    return res.json(response);
  }

  async resetPassword(req: Request, res: Response) {
    const data = userStorePasswordSchema.parse(req.body);

    if (data.token) {
      await resetPassword({
        password: data.password,
        userId: data.userId,
        token: data.token,
      });

      return res.status(201).json({ message: 'Senha alterada com sucesso' });
    } else {
      await createPassword(data.userId, data.password);

      return res.status(201).json({ message: 'Senha criada com sucesso' });
    }
  }

  async requestReset(req: Request, res: Response) {
    const email = requestResetSchema.parse(req.body.email);

    await requestPasswordReset(email);

    return res
      .status(200)
      .json({ message: 'Solicitação registrada, verifique seu email' });
  }
}

export default new AuthController();
