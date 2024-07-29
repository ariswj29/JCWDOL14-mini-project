import { reviewSchema } from '@/schema/schema';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as yup from 'yup';

const prisma = new PrismaClient();

export async function createReview(req: Request, res: Response) {
  try {
    await reviewSchema.validate(req.body, { abortEarly: false });
    const { rating, comment, eventId, transactionId, userId } = req.body;
    console.log('req.body', req.body);
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
      status: 'success',
      message: 'success create review',
      data: review,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: error.errors,
      });
    }
    res.status(400).json({ message: 'something went wrong' });
  }
}

export const getAllReview = async (req: Request, res: Response) => {
  try {
    const { page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const review = await prisma.review.findMany({
      include: { event: true, user: true },
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
    res.status(400).json({ error: 'error' });
  }
};
