import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createEvents = async (req: Request, res: Response) => {
  // try {
  const {
    name,
    isFree,
    price,
    date,
    time,
    location,
    description,
    availableSeats,
    categoryId,
    userId,
  } = req.body;

  const event = await prisma.event.create({
    data: {
      name,
      isFree,
      price: isFree ? 0 : price,
      date: new Date(date),
      time,
      location,
      description,
      availableSeats,
      categoryId,
      userId,
    },
  });
  res.status(201).json({ message: 'success', data: event });
  // } catch (error) {
  //   res.status(500).json({ error: 'Something went wrong' });
  // }
};
