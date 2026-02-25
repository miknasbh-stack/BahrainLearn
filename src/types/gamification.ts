export interface Achievement {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  category: 'mastery' | 'consistency' | 'speed' | 'exploration' | 'cultural';
  requirement: {
    type: 'pearls' | 'lessons' | 'streak' | 'score' | 'subjects';
    value: number;
  };
  reward: {
    pearls: number;
    badge: string;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'pearl';
  unlockedAt?: Date;
}

export interface Milestone {
  id: string;
  pearlTarget: number;
  nameAr: string;
  nameEn: string;
  reward: string;
  icon: string;
  culturalStory: string;
}

export interface WeeklyChallenge {
  id: string;
  weekStartDate: Date;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
  goal: {
    type: 'lessons' | 'pearls' | 'subjects' | 'score';
    target: number;
  };
  progress: number;
  reward: {
    pearls: number;
    badge?: string;
  };
  expiresAt: Date;
  completed: boolean;
}

export interface StudentStats {
  totalPearls: number;
  currentStreak: number;
  longestStreak: number;
  totalLessonsCompleted: number;
  averageScore: number;
  subjectsExplored: number;
  achievementsUnlocked: Achievement[];
  currentMilestone: Milestone;
  nextMilestone: Milestone;
}

export interface SubscriptionPlan {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  currency: 'BHD' | 'USD';
  subjectsIncluded: number | 'all';
  features: string[];
  popular?: boolean;
  trialDays?: number;
}
