import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { env } from '../config/env';
import { AppError } from '../utils/AppError';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      message: 'Body da requisicao invalido.',
      errors: error.flatten(),
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: 'Erro interno do servidor.',
    ...(env.NODE_ENV === 'development'
      ? {
          details: error instanceof Error ? error.message : 'Erro desconhecido.',
        }
      : {}),
  });
};
