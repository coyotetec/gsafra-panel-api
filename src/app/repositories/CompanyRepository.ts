import { prisma } from '../../libs/prisma';

type DataCompanyType = {
  name: string;
  externalId: string;
};

interface IFindFirstArgs {
  where: { externalId: string };
}

interface IFindeUnique {
  where: { id: string };
}

interface ICreateArgs {
  data: DataCompanyType;
}

interface IUpdateArgs {
  data: DataCompanyType;
  where: { id: string };
}

class CompanyRepository {
  async findFirst({ where }: IFindFirstArgs) {
    return await prisma.company.findFirst({
      where,
    });
  }

  async findUnique({ where }: IFindeUnique) {
    return await prisma.company.findUnique({ where });
  }

  async findMany() {
    return await prisma.company.findMany();
  }

  async create({ data }: ICreateArgs) {
    return await prisma.company.create({
      data,
    });
  }

  async update({ data, where }: IUpdateArgs) {
    return await prisma.company.update({ where, data });
  }

  async delete({ where }: IFindeUnique) {
    return await prisma.company.update({ where, data: { active: false } });
  }

  async restore({ where }: IFindeUnique) {
    return await prisma.company.update({ where, data: { active: true } });
  }
}
export default new CompanyRepository();
