import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useGamification } from '@/hooks/useGamification';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AchievementCard from '@/components/features/AchievementCard';
import MilestoneProgress from '@/components/features/MilestoneProgress';
import WeeklyChallengeCard from '@/components/features/WeeklyChallengeCard';
import { ACHIEVEMENTS } from '@/constants/gamification';
import { ArrowLeft, Trophy, Target, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RewardsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { stats } = useGamification();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  const unlockedIds = stats.achievementsUnlocked.map(a => a.id);
  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    if (filter === 'unlocked') return unlockedIds.includes(achievement.id);
    if (filter === 'locked') return !unlockedIds.includes(achievement.id);
    return true;
  });
  
  const achievementsByCategory = {
    mastery: filteredAchievements.filter(a => a.category === 'mastery'),
    consistency: filteredAchievements.filter(a => a.category === 'consistency'),
    speed: filteredAchievements.filter(a => a.category === 'speed'),
    exploration: filteredAchievements.filter(a => a.category === 'exploration'),
    cultural: filteredAchievements.filter(a => a.category === 'cultural'),
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bahrain-pearl to-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('العودة للصفحة الرئيسية', 'Back to Home')}
        </Button>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-bahrain-gold" />
            {t('الإنجازات والمكافآت', 'Achievements & Rewards')}
          </h1>
          <p className="text-gray-600">
            {t('اجمع اللؤلؤ، افتح الإنجازات، واحتفل بتقدمك!', 'Collect pearls, unlock achievements, and celebrate your progress!')}
          </p>
        </div>
        
        {/* Milestone Progress */}
        <div className="mb-8">
          <MilestoneProgress />
        </div>
        
        {/* Weekly Challenge */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            {t('التحدي الأسبوعي', 'Weekly Challenge')}
          </h2>
          <WeeklyChallengeCard />
        </div>
        
        {/* Achievements Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              {t('كل الإنجازات', 'All Achievements')}
            </h2>
            
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                size="sm"
              >
                {t('الكل', 'All')} ({ACHIEVEMENTS.length})
              </Button>
              <Button
                variant={filter === 'unlocked' ? 'default' : 'outline'}
                onClick={() => setFilter('unlocked')}
                size="sm"
              >
                {t('تم الفتح', 'Unlocked')} ({stats.achievementsUnlocked.length})
              </Button>
              <Button
                variant={filter === 'locked' ? 'default' : 'outline'}
                onClick={() => setFilter('locked')}
                size="sm"
              >
                {t('مقفل', 'Locked')} ({ACHIEVEMENTS.length - stats.achievementsUnlocked.length})
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="all">{t('الكل', 'All')}</TabsTrigger>
              <TabsTrigger value="mastery">🎯 {t('الإتقان', 'Mastery')}</TabsTrigger>
              <TabsTrigger value="consistency">📅 {t('الاستمرارية', 'Consistency')}</TabsTrigger>
              <TabsTrigger value="speed">⚡ {t('السرعة', 'Speed')}</TabsTrigger>
              <TabsTrigger value="exploration">🌍 {t('الاستكشاف', 'Exploration')}</TabsTrigger>
              <TabsTrigger value="cultural">🏛️ {t('ثقافي', 'Cultural')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredAchievements.map(achievement => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={unlockedIds.includes(achievement.id)}
                />
              ))}
            </TabsContent>
            
            {Object.entries(achievementsByCategory).map(([category, achievements]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {achievements.length > 0 ? (
                  achievements.map(achievement => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={unlockedIds.includes(achievement.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {t('لا توجد إنجازات في هذه الفئة', 'No achievements in this category')}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
