import { Request, Response } from "express";
import { createUser } from "../../useCases/panel/user/createUser";
import { inactivateUser } from "../../useCases/panel/user/inactivateUser";
import { activateUser } from "../../useCases/panel/user/activateUser";
import { updateUser } from "../../useCases/panel/user/updateUser";
import { listUsers } from "../../useCases/panel/user/listUsers";
import { AuthError } from "../../errors/AuthError";
import { userSchema, userStoreSchema } from "../../schemas/userSchemas";
import { bulkCreateUsers } from "../../useCases/panel/user/bulkCreateUsers";
import { createUserInFirebird } from "../../useCases/gsafra/user/createUser";

class UserController {
  async index(req: Request, res: Response) {
    // if (!['ADMIN', 'MANAGER'].includes(req.user.role)) {
    //   throw new AuthError('Você não tem permissão para listar os usuários');
    // }

    const users = await listUsers({
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(users);
  }

  async store(req: Request, res: Response) {
    if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
      throw new AuthError("Você não tem permissão para criar um usuário");
    }
    
    const data = req.body
    
    if (Array.isArray(data)) {
      if (req.user.role !== "MANAGER") {
        throw new AuthError(
          "Você não tem permissão para criar vários usuários",
        );
      }
    } else {
      if (data.role === "MANAGER" && req.user.role !== "MANAGER") {
        throw new AuthError(
          "Você não tem permissão para criar um usuário com este papel",
        );
      }
    }
    if (Array.isArray(data)) {
      const response = bulkCreateUsers(data);
      return res.status(201).json(response);
    }
    const firebirdUser: any = await createUserInFirebird({
      companyId: String(data.companyId),
      idPapel: data.idPapel,
      login: data.email,
    });
    const firebirdAgnostic = firebirdUser as unknown as any;
    const user = await Promise.all([
      await createUser({
        payload: data,
        requesterId: req.user.id,
        requesterRole: req.user.role,
        firebirdUserId: firebirdAgnostic.ID,
      }),
    ]);
    const preparedData = user.map((item) => ({
      ...item,
      firebirdUserId: firebirdAgnostic.ID,
    }));
    return res.status(201).json(preparedData);
  }

  async update(req: Request, res: Response) {
    if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
      throw new AuthError("Você não tem permissão para atualizar um usuários");
    }

    const id = req.params.id;
    const data = userSchema.parse(req.body);

    const user = await updateUser({
      payload: data,
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json(user);
  }

  async destroy(req: Request, res: Response) {
    if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
      throw new AuthError("Você não tem permissão para inativar um usuário");
    }

    const id = req.params.id;

    await inactivateUser({
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json({ message: "Usuário inativado" });
  }

  async activate(req: Request, res: Response) {
    if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
      throw new AuthError("Você não tem permissão para ativar um usuário");
    }

    const id = req.params.id;

    await activateUser({
      userId: id,
      requesterId: req.user.id,
      requesterRole: req.user.role,
    });

    return res.json({ message: "Usuário ativado" });
  }
}

export default new UserController();
