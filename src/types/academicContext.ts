export interface CourseContext {
  name: string;
  currentSemester?: number;
  requiredOptionalCredits?: number;
  completedOptionalCredits?: number;
  [key: string]: unknown;
}

export interface SubjectContext {
  name: string;
  teacher?: string;
  workloadHours?: number;
  minimumAttendancePercentage?: number;
  currentAttendancePercentage?: number;
  absencesInHours?: number;
  classDurationMinutes?: number;
  [key: string]: unknown;
}

export interface AcademicContext {
  registration: string;
  fullName: string;
  course: CourseContext;
  subjects: SubjectContext[];
  [key: string]: unknown;
}

export interface ChatRequestBody {
  message: string;
  studentContext: AcademicContext;
  [key: string]: unknown;
}
