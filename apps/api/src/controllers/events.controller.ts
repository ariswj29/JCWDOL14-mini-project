import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvents = async (req: Request, res: Response) => {
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

  const image = req.file?.filename;

  try {
    const event = await prisma.event.create({
      data: {
        name,
        image,
        isFree: Boolean(isFree),
        price: isFree ? 0 : price,
        date: new Date(date),
        time,
        location,
        description,
        availableSeats: Number(availableSeats),
        categoryId: Number(categoryId),
        userId: Number(userId),
      },
    });
    res.status(201).json({ message: 'Success create event', data: event });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();

    res.status(200).json({
      message: 'success',
      data: events,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export async function getEvent(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!event) throw new Error(`event with ${id} ID is not found`);

    res.status(200).json({
      message: 'success',
      data: event,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const image = req.file?.filename;

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: { ...req.body, image },
    });

    res.status(200).json({
      message: 'success update event',
      data: event,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const event = await prisma.event.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: 'success delete event',
      data: event,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
