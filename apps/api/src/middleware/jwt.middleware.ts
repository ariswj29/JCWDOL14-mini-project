import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  profileId: number;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('AUTHORIZATION HEADER => ', req.header('Authorization'));

    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log('token --> ', token);

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const verifyUser = verify(token, 'mySecret');
    if (!verifyUser) {
      return res.status(401).send('Unauthorized');
    }

    req.user = verifyUser as User;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'error',
      error: (err as Error).message,
    });
  }
};

export const adminGuard = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('login sebagai => ', req.user);

    if (req.user?.roleId != 2) {
      return res.status(403).send('Forbidden');
    }
    console.log(req.user, 'req');
    404;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'error',
      error: (err as Error).message,
    });
  }
};
export const customerGuard = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log('login sebagai => ', req.user);

    if (req.user?.roleId != 1) {
      return res.status(403).send('Forbidden');
    }
    console.log(req.user, 'req');
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: 'error',
      error: (err as Error).message,
    });
  }
};
