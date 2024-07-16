import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';
import { Prisma } from '@prisma/client';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { search, page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { firstName: { contains: search as string } },
            { lastName: { contains: search as string } },
          ],
        }
      : {};

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleId: true,
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const usersWithIndex = users.map((user, index) => ({
      ...user,
      no: (pageNumber - 1) * limitNumber + index + 1,
    }));

    const totalUsers = await prisma.user.count({ where });
    const totalPages = Math.ceil(totalUsers / limitNumber);

    res.status(200).json({
      message: 'success',
      data: usersWithIndex,
      pagination: {
        totalItems: totalUsers,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};
