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
}

export default new NotificationRepository();
