import { prisma } from '../../../libs/prisma';
interface INotificationDataRepository {
  title: string;
  body: string;
  allCompanies: boolean;
}

class NotificationRepository {
  findAll() {
    return prisma.notification.findMany({
      include: {
        notificationCompany: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByUserId(userId: string) {
    return prisma.notification.findMany({
      where: {
        OR: [
          {
            notificationCompany: {
              some: {
                company: {
                  userCompany: {
                    some: {
                      userId,
                    },
                  },
                },
              },
            },
          },
          {
            allCompanies: true,
          },
        ],
      },
    });
  }

  findById(id: string) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async findCompaniesByNotificationId(notificationId: string) {
    const currentCompanies = await prisma.notificationCompany.findMany({
      where: {
        notificationId,
      },
      select: {
        companyId: true,
      },
    });

    const currentCompaniesId = currentCompanies.map(
      (company) => company.companyId,
    );

    return currentCompaniesId;
  }

  create(data: INotificationDataRepository) {
    return prisma.notification.create({
      data,
    });
  }

  createSpecificNotification(
    notificationData: INotificationDataRepository,
    companiesId: string[],
  ) {
    return prisma.notification.create({
      data: {
        ...notificationData,
        notificationCompany: {
          createMany: {
            data: companiesId.map((companyId) => ({
              companyId,
            })),
          },
        },
      },
    });
  }

  update(id: string, data: INotificationDataRepository) {
    return prisma.notification.update({
      where: {
        id,
      },
      data,
    });
  }

  delete(id: string) {
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }
}

export default new NotificationRepository();
