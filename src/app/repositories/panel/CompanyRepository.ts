import { prisma } from '../../../libs/prisma';

type DataCompanyType = {
  name: string;
  password: string;
  host: string;
  externalId: string;
};

type findUniqueWhereType =
  | { id: string; externalId?: string }
  | { id?: string; externalId: string };

interface IFindFirstArgs {
  where: { externalId: string };
}

interface IFindeUnique {
  where: { id: string };
}

interface IFindManyWhere {
  active?: boolean;
}

interface ICreateArgs {
  data: DataCompanyType;
}

interface IUpdateArgs {
  data: {
    name: string;
    host: string;
    externalId: string;
  };
  where: { id: string };
}

class CompanyRepository {
  async findFirst({ where }: IFindFirstArgs) {
    return await prisma.company.findFirst({
      where,
    });
  }

  async findUnique(where: findUniqueWhereType) {
    return await prisma.company.findUnique({
      where,
    });
  }

  async findMany(where?: IFindManyWhere) {
    return await prisma.company.findMany({
      where: {
        active: where?.active,
      },
      orderBy: {
        externalId: 'asc',
      },
      include: {
        _count: {
          select: {
            userCompany: true,
          },
        },
      },
    });
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
