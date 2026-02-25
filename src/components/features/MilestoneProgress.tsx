import { useLanguage } from '@/hooks/useLanguage';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';

export default function MilestoneProgress() {
  const { t, language } = useLanguage();
  const { stats, getCurrentMilestoneProgress } = useGamification();
  const progress = getCurrentMilestoneProgress();
  
  return (
    <Card className="bg-gradient-to-br from-bahrain-gold/10 to-bahrain-sand/10 border-2 border-bahrain-gold/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-bahrain-gold" />
          {t('رحلة اللؤلؤ', 'Pearl Journey')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-center">
            <div className="text-4xl mb-2">{stats.currentMilestone.icon}</div>
            <p className="text-xs font-semibold text-gray-700">
              {language === 'ar' ? stats.currentMilestone.nameAr : stats.currentMilestone.nameEn}
            </p>
          </div>
          
          <div className="flex-1 mx-6">
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-bold text-bahrain-gold">
                {stats.totalPearls} 🐚
              </span>
              <span className="text-xs text-gray-600">
                {stats.nextMilestone.pearlTarget} {t('لؤلؤة', 'pearls')}
              </span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-2 animate-pulse">{stats.nextMilestone.icon}</div>
            <p className="text-xs font-semibold text-gray-700">
              {language === 'ar' ? stats.nextMilestone.nameAr : stats.nextMilestone.nameEn}
            </p>
          </div>
        </div>
        
        <div className="bg-white/70 p-4 rounded-lg border border-bahrain-gold/20">
          <p className="text-sm text-gray-700 leading-relaxed italic">
            {stats.nextMilestone.culturalStory}
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-primary">{stats.totalLessonsCompleted}</p>
            <p className="text-xs text-gray-600">{t('دروس', 'Lessons')}</p>
          </div>
          <div className="bg-white/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.currentStreak}</p>
            <p className="text-xs text-gray-600">{t('أيام متتالية', 'Day Streak')}</p>
          </div>
          <div className="bg-white/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{stats.averageScore}%</p>
            <p className="text-xs text-gray-600">{t('المعدل', 'Average')}</p>
          </div>
          <div className="bg-white/50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{stats.achievementsUnlocked.length}</p>
            <p className="text-xs text-gray-600">{t('إنجازات', 'Achievements')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
