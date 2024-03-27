import { prisma } from '../../../libs/prisma';

type findUniqueWhereType =
  | { id: string; userId?: string }
  | { id?: string; userId: string };

type dataType = {
  userId: string;
  token: string;
};

class ResetTokenRepository {
  create(data: dataType) {
    return prisma.resetToken.create({
      data,
    });
  }

  findUnique(where: findUniqueWhereType) {
    return prisma.resetToken.findUnique({
      where,
    });
  }

  deleteById(id: string) {
    return prisma.resetToken.delete({
      where: {
        id,
      },
    });
  }
}

export default new ResetTokenRepository();
