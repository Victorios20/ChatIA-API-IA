import { z } from 'zod';

const subjectSchema = z
  .object({
    name: z.string().trim().min(1, 'O nome da disciplina e obrigatorio.'),
    teacher: z.string().trim().min(1).optional(),
    workloadHours: z.number().nonnegative().optional(),
    minimumAttendancePercentage: z.number().min(0).max(100).optional(),
    currentAttendancePercentage: z.number().min(0).max(100).optional(),
    absencesInHours: z.number().nonnegative().optional(),
    classDurationMinutes: z.number().positive().optional(),
  })
  .passthrough();

const courseSchema = z
  .object({
    name: z.string().trim().min(1, 'O nome do curso e obrigatorio.'),
    currentSemester: z.number().int().positive().optional(),
    requiredOptionalCredits: z.number().nonnegative().optional(),
    completedOptionalCredits: z.number().nonnegative().optional(),
  })
  .passthrough();

const studentContextSchema = z
  .object({
    registration: z.string().trim().min(1, 'A matricula e obrigatoria.'),
    fullName: z.string().trim().min(1, 'O nome completo e obrigatorio.'),
    course: courseSchema,
    subjects: z.array(subjectSchema),
  })
  .passthrough();

export const chatSchema = z
  .object({
    message: z.string().trim().min(1, 'A mensagem e obrigatoria.'),
    studentContext: studentContextSchema,
  })
  .passthrough();

export type ChatSchema = z.infer<typeof chatSchema>;
