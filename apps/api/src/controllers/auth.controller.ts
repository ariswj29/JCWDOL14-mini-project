import { Request, Response } from 'express';
import prisma from '@/helpers/prisma';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import generateReferralCode from '@/helpers/generateReferralCode';
import { loginSchema, registerSchema } from '@/schema/schema';
import * as yup from 'yup';
import { sendVerificationEmail } from '@/utils/nodemailer';
import { generateVerificationToken } from '@/helpers/generateVerificationToken';

export const register = async (req: Request, res: Response) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });

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
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 90);

      await prisma.point.create({
        data: {
          profileId: usingReferralCodeProfile.id,
          point: 10000,
          expireAt: expirationDate,
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

    const verificationToken = generateVerificationToken(user.id);
    console.log(verificationToken, 'verToken', '||', email, 'userEmail');
    const name = `${user.firstName} ${user.lastName}`;
    sendVerificationEmail(email, verificationToken, name);

    res.status(201).json({
      status: 'success',
      message:
        'You have successfully registered. Please check your email to verify your account',
      data: user,
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

export const login = async (req: Request, res: Response) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });

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
    if (!user.verified) {
      return res.json({
        status: 'error',
        message: 'Please verify your email to login',
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
    if (error instanceof yup.ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: error.errors,
      });
    }

    res.status(400).json({ error: 'An unexpected error occurred' });
  }
};

export const verificationEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    console.log(token, 'token');

    if (!token) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or missing token',
      });
    }

    const secret = process.env.JWT_SECRET_KEY || 'secret-key';

    const decoded = verify(token as string, secret) as { userId: string };

    console.log(decoded, 'decoded');

    const user = await prisma.user.update({
      where: {
        id: Number(decoded.userId),
      },
      data: {
        verified: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Email successfully verified',
      user: user,
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({
      status: 'error',
      message: 'Email verification failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
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
