import { prisma } from '../../../libs/prisma';

type findAllWhereType = { companyId?: string; userId?: string };

type dataType = {
  companyId: string;
  userId: string;
};

class UserCompanyRepository {
  findAll(where?: findAllWhereType) {
    return prisma.userCompany.findMany({
      where,
    });
  }

  create(data: dataType) {
    return prisma.userCompany.create({
      data,
    });
  }
}

export default new UserCompanyRepository();
