import { Subject } from '@/types';

export const SUBJECTS: Record<Subject, {
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
}> = {
  math: {
    nameAr: 'الرياضيات',
    nameEn: 'Mathematics',
    icon: '🔢',
    color: '#0077BE',
    description: 'حل المسائل باستخدام الدينار البحريني والمعالم الشهيرة',
  },
  arabic: {
    nameAr: 'اللغة العربية',
    nameEn: 'Arabic Language',
    icon: '📖',
    color: '#C9A961',
    description: 'القراءة والكتابة والقصص البحرينية',
  },
  english: {
    nameAr: 'اللغة الإنجليزية',
    nameEn: 'English Language',
    icon: '🌍',
    color: '#4CAF50',
    description: 'تعلم الإنجليزية بأمثلة بحرينية',
  },
  science: {
    nameAr: 'العلوم',
    nameEn: 'Science',
    icon: '🔬',
    color: '#9C27B0',
    description: 'تجارب علمية مع البيئة البحرينية',
  },
  islamic: {
    nameAr: 'التربية الإسلامية',
    nameEn: 'Islamic Education',
    icon: '☪️',
    color: '#00897B',
    description: 'القيم الإسلامية والثقافة البحرينية',
  },
  history: {
    nameAr: 'التاريخ',
    nameEn: 'History',
    icon: '🏛️',
    color: '#D4A574',
    description: 'تاريخ البحرين وحضارة دلمون',
  },
};

export const GRADE_3_TOPICS: Record<Subject, string[]> = {
  math: [
    'الجمع والطرح حتى 1000',
    'الضرب والقسمة الأساسية',
    'الكسور البسيطة',
    'القياس والمقارنة',
    'الأشكال الهندسية',
    'النقود والوقت',
  ],
  arabic: [
    'القراءة والفهم',
    'القواعد الأساسية',
    'الإملاء والخط',
    'التعبير الكتابي',
    'الأدب والقصص',
    'المحادثة',
  ],
  english: [
    'Basic Vocabulary',
    'Simple Sentences',
    'Reading Comprehension',
    'Grammar Basics',
    'Writing Skills',
    'Pronunciation',
  ],
  science: [
    'الكائنات الحية',
    'النباتات والحيوانات',
    'الماء والهواء',
    'الطقس والمناخ',
    'المواد والخصائص',
    'الطاقة والحركة',
  ],
  islamic: [
    'العقيدة الإسلامية',
    'العبادات',
    'السيرة النبوية',
    'الأخلاق والآداب',
    'القرآن الكريم',
    'الأحاديث النبوية',
  ],
  history: [
    'تاريخ البحرين القديم',
    'حضارة دلمون',
    'التراث البحريني',
    'المعالم التاريخية',
    'الشخصيات التاريخية',
    'العادات والتقاليد',
  ],
};
