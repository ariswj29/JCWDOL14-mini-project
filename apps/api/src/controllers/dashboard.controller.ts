import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.count();
    const transactions = await prisma.transaction.count();
    const events = await prisma.event.count();
    const eventsThisYear = await prisma.event.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear(), 11, 31),
        },
      },
    });
    const eventsThisMonth = await prisma.event.count({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });
    const eventsToday = await prisma.event.count({
      where: {
        date: {
          gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
          ),
          lt: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() + 1,
          ),
        },
      },
    });
    const eventCategories = await prisma.event.groupBy({
      by: ['categoryId'],
      _count: {
        categoryId: true,
      },
    });
    const arrayCountCategories = eventCategories.map(
      (item) => item._count.categoryId,
    );
    const attandeePerMonth: { month: string; count: BigInt }[] =
      await prisma.$queryRaw`
    SELECT 
      DATE_FORMAT(createdAt, '%Y-%m') as month, 
      COUNT(*) as count 
    FROM users 
    GROUP BY month;
  `;
    const arrayCountAttandeePerMonth = attandeePerMonth.map(
      (item: { month: string; count: BigInt }) => Number(item.count),
    );

    res.json({
      users,
      transactions,
      events,
      eventsThisYear,
      eventsThisMonth,
      eventsToday,
      arrayCountCategories,
      arrayCountAttandeePerMonth,
    });
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
};
