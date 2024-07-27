import { promotionSchema } from '@/schema/schema';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as yup from 'yup';

const prisma = new PrismaClient();

export async function selectEvent(req: Request, res: Response) {
  try {
    const event = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    res.status(200).json({ message: 'success', data: event });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
}

export async function createPromotion(req: Request, res: Response) {
  try {
    await promotionSchema.validate(req.body, { abortEarly: false });

    const { code, discount, eventId, userId, expireAt } = req.body;

    const promotion = await prisma.promotion.create({
      data: {
        code,
        discount: Number(discount),
        eventId: Number(eventId),
        userId: Number(userId),
        expireAt: new Date(expireAt),
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'promotion successfully created',
      data: promotion,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: error.errors,
      });
    }
    res.status(400).json({ error: 'something went wrong' });
  }
}

export const getAllPromotions = async (req: Request, res: Response) => {
  try {
    const { search, page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const promotions = await prisma.promotion.findMany({
      where: {
        code: {
          contains: search as string,
        },
      },
      include: { event: true },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const promotionsWithIndex = promotions.map((promotion, index) => ({
      ...promotion,
      no: (pageNumber - 1) * limitNumber + index + 1,
    }));

    const totalPromotions = await prisma.promotion.count({ where: {} });
    const totalPages = Math.ceil(totalPromotions / limitNumber);

    res.status(200).json({
      status: 'success',
      message: 'success',
      data: promotionsWithIndex,
      pagination: {
        totalItems: totalPromotions,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};

export async function getPromotion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const promotion = await prisma.promotion.findUnique({
      where: { id: Number(id) },
      include: { event: true },
    });

    if (!promotion) throw new Error(`promotion with ${id} ID is not found`);

    res.status(200).json({
      status: 'success',
      message: 'success get promotion',
      data: promotion,
    });
  } catch (error) {
    res.status(400).json({ error: 'something went true' });
  }
}

export async function updatePromotion(req: Request, res: Response) {
  try {
    await promotionSchema.validate(req.body, { abortEarly: false });

    const { id } = req.params;
    const { code, discount, eventId, userId, expireAt } = req.body;

    const promotion = await prisma.promotion.update({
      where: { id: Number(id) },
      data: {
        code,
        discount: Number(discount),
        eventId: Number(eventId),
        userId: Number(userId),
        expireAt: new Date(expireAt),
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'promotion successfully updated',
      data: promotion,
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

export async function deletePromotion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const promotion = await prisma.promotion.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      status: 'success',
      message: 'succeess delete promotion',
      data: promotion,
    });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
}
