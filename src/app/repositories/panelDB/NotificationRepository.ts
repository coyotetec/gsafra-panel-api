import { prisma } from '../../../libs/prisma';
interface INotificationDataRepository {
  title: string;
  body: string;
  allCompanies: boolean;
}

class NotificationRepository {
  findAll() {
    return prisma.notification.findMany();
  }

  findByUserId(userId: string) {
    return prisma.notificationCompany.findMany({
      where: {
        OR: [
          {
            company: {
              userCompany: {
                some: {
                  userId,
                },
              },
            },
          },
          {
            notification: {
              allCompanies: true,
            },
          },
        ],
      },
      select: {
        notification: {
          select: {
            id: true,
            title: true,
            body: true,
            allCompanies: true,
          },
        },
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

  createEspecificNotification(
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
