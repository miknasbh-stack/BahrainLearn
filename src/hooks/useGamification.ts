import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, Milestone, WeeklyChallenge, StudentStats } from '@/types/gamification';
import { ACHIEVEMENTS, MILESTONES, WEEKLY_CHALLENGES_TEMPLATE } from '@/constants/gamification';

interface GamificationStore {
  stats: StudentStats;
  weeklyChallenge: WeeklyChallenge | null;
  unlockAchievement: (achievementId: string) => void;
  updateProgress: (type: 'lessons' | 'pearls' | 'subjects' | 'score' | 'streak', value: number) => void;
  checkAchievements: () => Achievement[];
  updateWeeklyChallenge: (progress: number) => void;
  generateNewWeeklyChallenge: () => void;
  getCurrentMilestoneProgress: () => number;
}

const getInitialStats = (): StudentStats => {
  const firstMilestone = MILESTONES[0];
  const secondMilestone = MILESTONES[1];
  
  return {
    totalPearls: 245,
    currentStreak: 3,
    longestStreak: 7,
    totalLessonsCompleted: 12,
    averageScore: 82,
    subjectsExplored: 4,
    achievementsUnlocked: [],
    currentMilestone: firstMilestone,
    nextMilestone: secondMilestone,
  };
};

const generateWeeklyChallenge = (): WeeklyChallenge => {
  const template = WEEKLY_CHALLENGES_TEMPLATE[
    Math.floor(Math.random() * WEEKLY_CHALLENGES_TEMPLATE.length)
  ];
  
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const dayOfWeek = startDate.getDay();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startDate.setDate(startDate.getDate() - daysToMonday);
  
  const expiresAt = new Date(startDate);
  expiresAt.setDate(expiresAt.getDate() + 7);
  
  return {
    ...template,
    id: `challenge-${startDate.getTime()}`,
    weekStartDate: startDate,
    expiresAt,
    progress: 0,
    completed: false,
  };
};

export const useGamification = create<GamificationStore>()(
  persist(
    (set, get) => ({
      stats: getInitialStats(),
      weeklyChallenge: generateWeeklyChallenge(),
      
      unlockAchievement: (achievementId) => {
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        if (!achievement) return;
        
        set((state) => {
          const alreadyUnlocked = state.stats.achievementsUnlocked.some(a => a.id === achievementId);
          if (alreadyUnlocked) return state;
          
          return {
            stats: {
              ...state.stats,
              achievementsUnlocked: [
                ...state.stats.achievementsUnlocked,
                { ...achievement, unlockedAt: new Date() },
              ],
              totalPearls: state.stats.totalPearls + achievement.reward.pearls,
            },
          };
        });
      },
      
      updateProgress: (type, value) => {
        set((state) => {
          const newStats = { ...state.stats };
          
          switch (type) {
            case 'lessons':
              newStats.totalLessonsCompleted += value;
              break;
            case 'pearls':
              newStats.totalPearls += value;
              break;
            case 'subjects':
              newStats.subjectsExplored = Math.max(newStats.subjectsExplored, value);
              break;
            case 'score':
              const totalScore = newStats.averageScore * (newStats.totalLessonsCompleted - 1) + value;
              newStats.averageScore = Math.round(totalScore / newStats.totalLessonsCompleted);
              break;
            case 'streak':
              newStats.currentStreak = value;
              newStats.longestStreak = Math.max(newStats.longestStreak, value);
              break;
          }
          
          // Update milestones
          const currentMilestoneIndex = MILESTONES.findIndex(m => m.id === newStats.currentMilestone.id);
          if (newStats.totalPearls >= newStats.nextMilestone.pearlTarget) {
            const nextIndex = Math.min(currentMilestoneIndex + 2, MILESTONES.length - 1);
            newStats.currentMilestone = MILESTONES[currentMilestoneIndex + 1];
            newStats.nextMilestone = MILESTONES[nextIndex];
          }
          
          return { stats: newStats };
        });
        
        // Check for new achievements
        get().checkAchievements();
      },
      
      checkAchievements: () => {
        const { stats } = get();
        const newlyUnlocked: Achievement[] = [];
        
        ACHIEVEMENTS.forEach((achievement) => {
          const alreadyUnlocked = stats.achievementsUnlocked.some(a => a.id === achievement.id);
          if (alreadyUnlocked) return;
          
          let shouldUnlock = false;
          
          switch (achievement.requirement.type) {
            case 'pearls':
              shouldUnlock = stats.totalPearls >= achievement.requirement.value;
              break;
            case 'lessons':
              shouldUnlock = stats.totalLessonsCompleted >= achievement.requirement.value;
              break;
            case 'streak':
              shouldUnlock = stats.longestStreak >= achievement.requirement.value;
              break;
            case 'score':
              shouldUnlock = stats.averageScore >= achievement.requirement.value;
              break;
            case 'subjects':
              shouldUnlock = stats.subjectsExplored >= achievement.requirement.value;
              break;
          }
          
          if (shouldUnlock) {
            get().unlockAchievement(achievement.id);
            newlyUnlocked.push(achievement);
          }
        });
        
        return newlyUnlocked;
      },
      
      updateWeeklyChallenge: (progress) => {
        set((state) => {
          if (!state.weeklyChallenge) return state;
          
          const updated = { ...state.weeklyChallenge };
          updated.progress = progress;
          
          if (progress >= updated.goal.target && !updated.completed) {
            updated.completed = true;
            return {
              weeklyChallenge: updated,
              stats: {
                ...state.stats,
                totalPearls: state.stats.totalPearls + updated.reward.pearls,
              },
            };
          }
          
          return { weeklyChallenge: updated };
        });
      },
      
      generateNewWeeklyChallenge: () => {
        set({ weeklyChallenge: generateWeeklyChallenge() });
      },
      
      getCurrentMilestoneProgress: () => {
        const { stats } = get();
        const previousMilestone = MILESTONES[
          Math.max(0, MILESTONES.findIndex(m => m.id === stats.currentMilestone.id) - 1)
        ];
        const previousTarget = previousMilestone?.pearlTarget || 0;
        const currentTarget = stats.nextMilestone.pearlTarget;
        const progress = stats.totalPearls - previousTarget;
        const total = currentTarget - previousTarget;
        return (progress / total) * 100;
      },
    }),
    {
      name: 'bahrain-learn-gamification',
    }
  )
);
