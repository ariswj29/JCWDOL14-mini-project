import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '@/helpers/prisma';

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
        price: Number(price),
        date: new Date(date),
        time,
        location,
        description,
        availableSeats: Number(availableSeats),
        categoryId: Number(categoryId),
        userId: Number(userId),
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'Success create event',
      data: event,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const sort = req.query.sort as any;
    const category = req.query.category as any;

    const skip = page == 1 ? page - 1 : (page - 1) * limit;

    let whereSearch: any = {};
    let whereSearchWithoutPagination: any = {};

    if (search) {
      const where: Prisma.EventWhereInput = {
        ...(search && {
          OR: [
            { name: { contains: search as string } },
            { location: { contains: search as string } },
          ],
        }),
      };

      whereSearch = {
        where,
      };

      whereSearchWithoutPagination = {
        where,
      };
    }

    if (sort && sort == 'location') {
      whereSearch = {
        ...whereSearch,
        orderBy: [
          {
            location: 'asc',
          },
        ],
      };
    }

    if (sort && sort == 'lowerprice') {
      whereSearch = {
        ...whereSearch,
        orderBy: [
          {
            price: 'asc',
          },
        ],
      };
    }

    if (sort && sort == 'highestprice') {
      whereSearch = {
        ...whereSearch,
        orderBy: [
          {
            price: 'desc',
          },
        ],
      };
    }

    const today = new Date();

    if (sort && sort === 'newest') {
      whereSearch = {
        ...whereSearch,
        orderBy: [
          {
            date: 'asc',
          },
        ],
        where: {
          date: {
            gte: today,
          },
        },
      };
    }

    whereSearch = {
      ...whereSearch,
      skip,
      take: limit,
    };

    if (category && category == 'music') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 1,
        },
      };
    }

    if (category && category == 'holidays') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 2,
        },
      };
    }
    if (category && category == 'football') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 3,
        },
      };
    }
    if (category && category == 'seminar') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 4,
        },
      };
    }
    if (category && category == 'film') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 5,
        },
      };
    }
    if (category && category == 'automotive') {
      whereSearch = {
        ...whereSearch,
        where: {
          categoryId: 6,
        },
      };
    }

    const events = await prisma.event.findMany(whereSearch);
    const eventCount = await prisma.event.count(whereSearchWithoutPagination);

    res.status(200).json({
      status: 'success',
      message: 'success show all events',
      data: events,
      total: Math.ceil(eventCount / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error });
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
      status: 'success',
      message: 'success show event',
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

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        name,
        image,
        isFree: Boolean(isFree),
        price: Number(price),
        date: new Date(date),
        time,
        location,
        description,
        availableSeats: Number(availableSeats),
        categoryId: Number(categoryId),
        userId: Number(userId),
      },
    });

    res.status(200).json({
      status: 'success',
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
      status: 'success',
      message: 'success delete event',
      data: event,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

export const getAllTableEvent = async (req: Request, res: Response) => {
  try {
    const { search, page, limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const events = await prisma.event.findMany({
      where: {
        name: {
          contains: search as string,
        },
      },
      include: { category: true },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });

    const eventsWithIndex = events.map((event, index) => ({
      ...event,
      no: (pageNumber - 1) * limitNumber + index + 1,
    }));

    const totalEvents = await prisma.event.count({ where: {} });
    const totalPages = Math.ceil(totalEvents / limitNumber);

    res.status(200).json({
      status: 'success',
      message: 'success get all events',
      data: eventsWithIndex,
      pagination: {
        totalItems: totalEvents,
        totalPages,
        currentPage: pageNumber,
        pageSize: limitNumber,
      },
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};
