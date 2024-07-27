import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: parseInt(req.params.id),
      },
      include: {
        user: true,
        point: true,
      },
    });
    const totalPoint = profile?.point.reduce((acc, curr) => {
      return acc + curr.point;
    }, 0);
    res.status(200).json({
      status: 'success',
      data: {
        id: profile?.id,
        referralCode: profile?.referralCode,
        discount: profile?.discount,
        saldo: profile?.saldo,
        user: profile?.user,
        points: totalPoint,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const profile = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.status(200).json({
      status: 'success',
      message: 'Profile successfully updated',
      data: profile,
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};

export const topUpSaldo = async (req: Request, res: Response) => {
  try {
    const user = await prisma.profile.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        saldo: {
          increment: parseInt(req.body.saldo),
        },
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Saldo successfully updated',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};
