import { GoogleGenAI } from '@google/genai';

import { env } from '../config/env';
import { systemPrompt } from '../prompts/systemPrompt';
import type { AcademicContext } from '../types/academicContext';
import { AppError } from '../utils/AppError';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

interface GenerateChatAnswerParams {
  message: string;
  studentContext: AcademicContext;
}

function buildGeminiContents(message: string, studentContext: AcademicContext): string {
  return [
    'Contexto academico do aluno em JSON:',
    JSON.stringify(studentContext, null, 2),
    '',
    `Pergunta do aluno: ${message}`,
  ].join('\n');
}

export async function generateChatAnswer({
  message,
  studentContext,
}: GenerateChatAnswerParams): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: env.GEMINI_MODEL,
      contents: buildGeminiContents(message, studentContext),
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
      },
    });

    const answer = response.text?.trim();

    if (!answer) {
      throw new AppError(502, 'O Gemini retornou uma resposta vazia.');
    }

    return answer;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(502, 'Nao foi possivel obter uma resposta do Gemini no momento.');
  }
}
