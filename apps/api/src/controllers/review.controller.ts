import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function createReview(req: Request, res: Response) {
  const { rating, comment, eventId, transactionId, userId } = req.body;
  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        eventId: Number(eventId),
        transactionId: Number(transactionId),
        userId: Number(userId),
      },
    });
    res.status(200).json({
      status: 'succeess',
      message: 'success create review',
      data: review,
    });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
}

export const getAllReview = async (req: Request, res: Response) => {
  try {
    const { page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const review = await prisma.review.findMany({
      include: { event: true },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const reviewWithIndex = review.map((review, index) => ({
      ...review,
      no: (pageNumber - 1) * limitNumber + index + 1,
    }));

    const totalReview = await prisma.review.count({ where: {} });
    const totalPages = Math.ceil(totalReview / limitNumber);

    res.status(200).json({
      status: 'success',
      message: 'success get all review',
      data: reviewWithIndex,
      pagination: {
        totalItems: totalReview,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
};
