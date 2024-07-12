import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: parseInt(req.params.id),
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({
      status: 'success',
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};
