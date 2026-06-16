import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

import { db } from '../config/database.js';
import logger from '../config/logger.js';
import { users } from '../models/user.model.js';
import { formatValidationErrors } from '../utils/format.js';
import { jwttoken } from '../utils/jwt.js';
import { signinSchema, signupSchema } from '../validations/auth.validation.js';

export const signUpStatus = async (req, res) => {
  logger.info('Sign-up route accessed', { method: req.method });

  return res.status(200).json({
    message: 'Sign-up endpoint is ready. Send a POST request to create a user.',
  });
};

export const signUp = async (req, res) => {
  try {
    logger.info('Authentication request received', { action: 'sign-up' });

    const parsed = signupSchema.parse(req.body);

    const existingUsers = await db.select().from(users).where(eq(users.email, parsed.email));

    if (existingUsers.length > 0) {
      logger.info('Sign-up request rejected', { reason: 'email already exists' });
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);

    const [user] = await db.insert(users).values({
      ...parsed,
      password: hashedPassword,
    }).returning();

    logger.info('Sign-up request completed', { userId: user.id, role: user.role });

    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.issues) {
      logger.info('Sign-up validation failed', { error: formatValidationErrors(error) });
      return res.status(400).json({ message: formatValidationErrors(error) });
    }

    logger.error('Sign-up request failed', { error: error.message, stack: error.stack });
    return res.status(500).json({ message: 'Server error' });
  }
};

export const signIn = async (req, res) => {
  try {
    logger.info('Authentication request received', { action: 'sign-in' });

    const parsed = signinSchema.parse(req.body);

    const [user] = await db.select().from(users).where(eq(users.email, parsed.email));

    if (!user) {
      logger.info('Sign-in request rejected', { reason: 'invalid credentials' });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(parsed.password, user.password);

    if (!isValidPassword) {
      logger.info('Sign-in request rejected', { reason: 'invalid password' });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwttoken.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    logger.info('Sign-in request completed', { userId: user.id, role: user.role });

    return res.status(200).json({
      message: 'Signed in successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.issues) {
      logger.info('Sign-in validation failed', { error: formatValidationErrors(error) });
      return res.status(400).json({ message: formatValidationErrors(error) });
    }

    logger.error('Sign-in request failed', { error: error.message, stack: error.stack });
    return res.status(500).json({ message: 'Server error' });
  }
};

export const signOut = async (req, res) => {
  logger.info('Authentication request received', { action: 'sign-out' });

  res.clearCookie('token');

  logger.info('Sign-out request completed');

  return res.status(200).json({ message: 'Signed out successfully' });
};
