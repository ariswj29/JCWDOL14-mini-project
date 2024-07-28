import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';
import getNextQN from '@/helpers/generateQN';
import { orderTicketSchema } from '@/schema/schema';
import * as yup from 'yup';

export const ticketTransaction = async (req: Request, res: Response) => {
  try {
    await orderTicketSchema.validate(req.body, { abortEarly: false });

    const {
      eventId,
      userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      totalTransaction,
    } = req.body;

    const event = await prisma.event.findUnique({
      where: {
        id: Number(eventId || 0),
      },
    });

    if (event === null) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }

    const profile = await prisma.profile.findFirst({
      where: {
        userId: Number(userId || 0),
      },
    });

    if (profile === null) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found!',
      });
    }

    const discount = profile.discount / 100;
    if (profile.points > 0 && discount > 0) {
      event.price = event.price - event.price * discount;
      event.price = event.price - profile.points;
      console.log('points and discount', event.price);
    } else if (profile.points > 0) {
      event.price = event.price - profile.points;
      console.log('points', event.price);
    } else if (discount > 0) {
      event.price = event.price - event.price * discount;
      console.log('discount', event.price);
    } else {
      event.price = event.price;
    }

    const saldo = profile.saldo || 0;
    if (saldo <= totalTransaction) {
      return res.status(400).json({
        status: 'error',
        message: 'Saldo not enough!',
      });
    }

    const user = await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        eventId: Number(eventId),
        userId: Number(userId),
        price: Number(totalTransaction),
        date: new Date(),
      },
    });

    const attandee = await prisma.attandee.create({
      data: {
        transaction: {
          connect: {
            id: transaction.id,
          },
        },
        qn: getNextQN(eventId),
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
      },
    });

    const newSaldo = saldo - transaction.price;
    await prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        saldo: newSaldo,
        points: 0,
        discount: 0,
      },
    });

    await prisma.point.deleteMany({
      where: {
        profileId: profile.id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'success buy ticket',
      data: { ...transaction, qn: attandee.qn, remainingSaldo: newSaldo },
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: error.errors,
      });
    }
    res.status(400).json({ error: 'An unexpected error occurred' });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  try {
    const attandees = await prisma.attandee.findFirst({
      where: {
        transactionId: Number(req.params.id),
      },
      include: {
        transaction: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: attandees,
    });
  } catch (error) {
    res.status(400).json({ error: 'An unexpected error occurred' });
  }
};

export const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const { page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const transaction = await prisma.attandee.findMany({
      include: { event: true, user: true, transaction: true },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    } as any);

    const transactionWithIndex = transaction.map((transaction, index) => ({
      ...transaction,
      no: (pageNumber - 1) * limitNumber + index + 1,
    }));

    const totalReview = await prisma.attandee.count({ where: {} });
    const totalPages = Math.ceil(totalReview / limitNumber);

    res.status(200).json({
      status: 'success',
      message: 'success get all transaction',
      data: transactionWithIndex,
      pagination: {
        totalItems: totalReview,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'An unexpected error occurred' });
  }
};
