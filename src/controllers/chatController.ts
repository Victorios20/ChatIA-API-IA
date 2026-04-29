import type { Request, Response } from 'express';

import { chatSchema } from '../schemas/chatSchema';
import { generateChatAnswer } from '../services/geminiService';
import type { ChatRequestBody } from '../types/academicContext';
import { AppError } from '../utils/AppError';

export async function chatController(
  req: Request<unknown, unknown, ChatRequestBody>,
  res: Response,
): Promise<Response> {
  const parsedBody = chatSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      message: 'Body da requisicao invalido.',
      errors: parsedBody.error.flatten(),
    });
  }

  try {
    const answer = await generateChatAnswer({
      message: parsedBody.data.message,
      studentContext: parsedBody.data.studentContext,
    });

    return res.status(200).json({ answer });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    return res.status(500).json({
      message: 'Erro interno do servidor.',
    });
  }
}
