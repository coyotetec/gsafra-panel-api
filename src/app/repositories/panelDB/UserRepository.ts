import { prisma } from '../../../libs/prisma';

type findUniqueWhereType =
  | { id: string; email?: string }
  | { id?: string; email: string };

type dataType = {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
  externalId: number;
};

class UserRepository {
  findAll() {
    return prisma.user.findMany();
  }

  findUnique(where: findUniqueWhereType) {
    return prisma.user.findUnique({
      where,
    });
  }

  create(data: dataType) {
    return prisma.user.create({
      data,
    });
  }

  createPassword(id: string, password: string) {
    return prisma.user.update({
      data: {
        password,
      },
      where: {
        id,
      },
    });
  }

  update(id: string, data: dataType) {
    return prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  inactivateUser(id: string) {
    return prisma.user.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    });
  }

  activateUser(id: string) {
    return prisma.user.update({
      data: {
        active: true,
      },
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();