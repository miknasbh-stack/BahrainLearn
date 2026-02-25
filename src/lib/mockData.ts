import { Student, SubjectProgress, LessonProgress, Lesson } from '@/types';

export const mockStudent: Student = {
  id: '1',
  name: 'أحمد محمد',
  grade: 3,
  subjects: ['math', 'arabic', 'english', 'science', 'islamic', 'history'],
  pearlPoints: 245,
  createdAt: new Date('2024-01-15'),
};

export const mockProgress: SubjectProgress[] = [
  {
    subject: 'math',
    completionPercentage: 65,
    timeSpentMinutes: 180,
    currentTopic: 'الكسور البسيطة',
    masteryLevel: 'intermediate',
    lastActivity: new Date(),
    pearlsEarned: 85,
  },
  {
    subject: 'arabic',
    completionPercentage: 72,
    timeSpentMinutes: 150,
    currentTopic: 'القراءة والفهم',
    masteryLevel: 'advanced',
    lastActivity: new Date(Date.now() - 86400000),
    pearlsEarned: 95,
  },
  {
    subject: 'english',
    completionPercentage: 45,
    timeSpentMinutes: 90,
    currentTopic: 'Simple Sentences',
    masteryLevel: 'beginner',
    lastActivity: new Date(Date.now() - 172800000),
    pearlsEarned: 45,
  },
  {
    subject: 'science',
    completionPercentage: 58,
    timeSpentMinutes: 120,
    currentTopic: 'الكائنات الحية',
    masteryLevel: 'intermediate',
    lastActivity: new Date(Date.now() - 86400000),
    pearlsEarned: 70,
  },
  {
    subject: 'islamic',
    completionPercentage: 80,
    timeSpentMinutes: 100,
    currentTopic: 'العبادات',
    masteryLevel: 'advanced',
    lastActivity: new Date(),
    pearlsEarned: 100,
  },
  {
    subject: 'history',
    completionPercentage: 38,
    timeSpentMinutes: 60,
    currentTopic: 'حضارة دلمون',
    masteryLevel: 'beginner',
    lastActivity: new Date(Date.now() - 259200000),
    pearlsEarned: 35,
  },
];

export const mockRecentActivities: LessonProgress[] = [
  {
    lessonId: '1',
    studentId: '1',
    completedAt: new Date(),
    score: 85,
    timeSpent: 25,
    struggledConcepts: [],
    pearlsEarned: 15,
  },
  {
    lessonId: '2',
    studentId: '1',
    completedAt: new Date(Date.now() - 86400000),
    score: 92,
    timeSpent: 20,
    struggledConcepts: [],
    pearlsEarned: 20,
  },
  {
    lessonId: '3',
    studentId: '1',
    completedAt: new Date(Date.now() - 172800000),
    score: 68,
    timeSpent: 35,
    struggledConcepts: ['الكسور المتساوية'],
    pearlsEarned: 10,
  },
];

export const mockMathLesson: Lesson = {
  id: 'math-fractions-1',
  subject: 'math',
  grade: 3,
  topic: 'الكسور البسيطة',
  difficulty: 'medium',
  estimatedMinutes: 25,
  culturalContext: 'استخدام الدينار البحريني',
  content: {
    introduction: 'مرحباً! اليوم سنتعلم عن الكسور. الكسور تساعدنا في تقسيم الأشياء إلى أجزاء متساوية.',
    mainContent: [
      {
        type: 'text',
        content: 'الكسر هو جزء من كل. مثلاً، إذا قسمنا تفاحة إلى نصفين، كل نصف يكون ½.',
      },
      {
        type: 'example',
        content: 'مثال بحريني: لديك دينار بحريني واحد. إذا أنفقت نصف دينار، تبقى لديك ½ دينار.',
        bahrainExample: 'الدينار البحريني = 1000 فلس، النصف = 500 فلس',
        imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=400&h=300&fit=crop',
      },
      {
        type: 'visual',
        content: 'شاهد كيف نقسم الدائرة إلى أنصاف وأرباع',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
      },
      {
        type: 'interactive',
        content: 'الآن جرّب بنفسك! ارسم دائرة وقسمها إلى 4 أجزاء متساوية.',
      },
    ],
    practice: [
      {
        id: 'q1',
        question: 'إذا قسمنا كعكة إلى 4 أجزاء متساوية، كم يمثل كل جزء؟',
        options: ['½', '¼', '¾', '⅓'],
        correctAnswer: '¼',
        explanation: 'ممتاز! عندما نقسم شيئاً إلى 4 أجزاء متساوية، كل جزء يكون ربع (¼).',
        difficulty: 'easy',
      },
      {
        id: 'q2',
        question: 'لديك 2 دينار بحريني. إذا أنفقت نصف المبلغ، كم دينار أنفقت؟',
        options: ['½ دينار', '1 دينار', '1½ دينار', '2 دينار'],
        correctAnswer: '1 دينار',
        explanation: 'رائع! نصف 2 دينار = 1 دينار.',
        difficulty: 'medium',
        adaptiveHint: 'فكر: 2 مقسومة على 2 = ؟',
      },
      {
        id: 'q3',
        question: 'أي كسر أكبر: ½ أم ¼؟',
        options: ['½', '¼', 'متساويان', 'لا يمكن المقارنة'],
        correctAnswer: '½',
        explanation: 'صحيح! النصف (½) أكبر من الربع (¼) لأنه يمثل جزءاً أكبر من الكل.',
        difficulty: 'medium',
        adaptiveHint: 'تخيل بيتزا مقسمة إلى نصفين، ثم بيتزا مقسمة إلى 4 أرباع. أي قطعة أكبر؟',
      },
    ],
    summary: 'أحسنت! تعلمت اليوم:\n• الكسر هو جزء من كل\n• ½ يعني نصف\n• ¼ يعني ربع\n• يمكننا استخدام الكسور مع النقود البحرينية',
  },
};
