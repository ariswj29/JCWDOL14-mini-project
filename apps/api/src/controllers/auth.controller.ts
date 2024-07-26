import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import generateReferralCode from '@/helpers/generateReferralCode';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, roleId, email, password, usingReferralCode } =
      req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.json({
        status: 'error',
        message: 'User already exists',
      });
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        roleId: Number(roleId),
        email,
        password: hashedPassword,
        usingReferralCode,
      },
    });

    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        referralCode: generateReferralCode(8),
        points: 0,
        discount: 0,
        saldo: 0,
      },
    });

    const usingReferralCodeProfile = await prisma.profile.findFirst({
      where: {
        referralCode: usingReferralCode,
      },
    });

    if (usingReferralCodeProfile) {
      await prisma.profile.update({
        where: {
          id: usingReferralCodeProfile?.id,
        },
        data: {
          points: usingReferralCodeProfile?.points! + 10000,
        },
      });

      await prisma.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          discount: 10,
        },
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'You have successfully registered',
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const data = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      roleId: user?.roleId,
      profileId: user?.id,
    };
    if (!user) {
      return res.json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    const invalidPassword = await compare(password, user.password);
    if (!invalidPassword) {
      return res.json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }
    const jwtPayload = {
      firstName: user.firstName,
      email: user.email,
      roleId: user?.roleId,
    };
    const token = await sign(jwtPayload, 'mySecret', {
      expiresIn: '1h',
    });
    res.status(200).json({
      status: 'success',
      message: 'You have successfully logged in',
      data: data,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};

export const checkReferralCode = async (req: Request, res: Response) => {
  try {
    const { usingReferralCode } = req.body;
    const user = await prisma.profile.findFirst({
      where: {
        referralCode: usingReferralCode,
      },
    });
    if (!user) {
      return res.json({
        status: 'error',
        message: 'Invalid referral code',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Referral code is valid',
    });
  } catch (error) {
    res.status(400).json({ error: 'error' });
  }
};
