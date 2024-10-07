import { hashPassword } from "../../../../utils/hashPassword";
import { sendEmail } from "../../../../utils/sendEmail";
import { validatePassword } from "../../../../utils/validatePassword";
import { APPError } from "../../../errors/APPError";
import ResetTokenRepository from "../../../repositories/panel/ResetTokenRepository";
import UserRepository from "../../../repositories/panel/UserRepository";

interface IResetPasswordPayload {
  token: string;
  password: string;
  userId: string;
}

export async function resetPassword(payload: IResetPasswordPayload) {
  const resetToken = await ResetTokenRepository.findUnique({
    userId: payload.userId,
  });
  const tokenInValid =
    resetToken && (await validatePassword(payload.token, resetToken.token));

  if (!resetToken || !tokenInValid) {
    throw new APPError(
      "Seu token está inválido ou expirado, tente solicitar novamente",
    );
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await UserRepository.createPassword(
    payload.userId,
    hashedPassword,
  );

  await ResetTokenRepository.deleteById(resetToken.id);

  sendEmail(
    user.email,
    "Senha Alterada com Sucesso",
    { name: user.name },
    "passwordChanged",
  );
}
