import { Request, Response } from "express";
import { listUsers } from "../../useCases/gsafra/user/listUsers";
import { AuthError } from "../../errors/AuthError";
import { createUserInFirebird } from "../../useCases/gsafra/user/createUser";
import { APPError } from "../../errors/APPError";

class UserController {
  async index(req: Request, res: Response) {
    if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
      throw new AuthError("Você não tem permissão para listar os usuários");
    }

    const companyId = req.params.id;

    const users = await listUsers({
      companyId,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(users);
  }

  async create(req: Request, res: Response) {
    const { companyId } = req.query;
    const { idPapel, email } = req.body;
    if (!companyId) {
      throw new APPError("CompanyId é obrigatório");
    }
    await createUserInFirebird({
      companyId: String(companyId),
      idPapel,
      login: email,
    });

    return res.json({
      success: "Usuário criado com sucesso",
    });
  }
}

export default new UserController();
