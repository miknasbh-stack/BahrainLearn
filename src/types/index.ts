
export type Language = 'ar' | 'en';

export type Subject = 'math' | 'arabic' | 'english' | 'science' | 'islamic' | 'history';

export interface Student {
  id: string;
  name: string;
  grade: number;
  avatar?: string;
  subjects: Subject[];
  pearlPoints: number;
  createdAt: Date;
}

export interface SubjectProgress {
  subject: Subject;
  completionPercentage: number;
  timeSpentMinutes: number;
  currentTopic: string;
  masteryLevel: 'beginner' | 'intermediate' | 'advanced';
  lastActivity: Date;
  pearlsEarned: number;
}

export interface Lesson {
  id: string;
  subject: Subject;
  grade: number;
  topic: string;
  content: LessonContent;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  culturalContext?: string;
}

export interface LessonContent {
  introduction: string;
  mainContent: ContentBlock[];
  practice: Question[];
  summary: string;
}

export interface ContentBlock {
  type: 'text' | 'example' | 'visual' | 'interactive';
  content: string;
  bahrainExample?: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  adaptiveHint?: string;
}

export interface LessonProgress {
  lessonId: string;
  studentId: string;
  completedAt?: Date;
  score?: number;
  timeSpent: number;
  struggledConcepts: string[];
  pearlsEarned: number;
}

export interface ParentDashboardData {
  student: Student;
  weeklyProgress: SubjectProgress[];
  recentActivities: LessonProgress[];
  recommendations: string[];
  totalTimeThisWeek: number;
  pearlsThisWeek: number;
}
