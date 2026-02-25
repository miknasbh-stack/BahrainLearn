import { Achievement } from '@/types/gamification';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock } from 'lucide-react';
import { TIER_GRADIENTS } from '@/constants/gamification';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked?: boolean;
}

export default function AchievementCard({ achievement, unlocked = false }: AchievementCardProps) {
  const { t, language } = useLanguage();
  
  return (
    <Card className={cn(
      'relative overflow-hidden transition-all duration-300 hover:scale-105',
      unlocked ? 'shadow-lg' : 'opacity-60 grayscale'
    )}>
      {unlocked && (
        <div className={cn(
          'absolute top-0 left-0 w-full h-1 bg-gradient-to-r',
          TIER_GRADIENTS[achievement.tier]
        )} />
      )}
      
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            'text-5xl p-3 rounded-2xl bg-gradient-to-br',
            unlocked ? TIER_GRADIENTS[achievement.tier] : 'from-gray-200 to-gray-300'
          )}>
            {unlocked ? achievement.icon : <Lock className="w-10 h-10 text-gray-500" />}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-gray-900">
                {language === 'ar' ? achievement.nameAr : achievement.nameEn}
              </h3>
              <Badge variant={unlocked ? 'default' : 'secondary'} className="text-xs">
                {t(achievement.tier === 'pearl' ? 'لؤلؤي' : achievement.tier === 'gold' ? 'ذهبي' : achievement.tier === 'silver' ? 'فضي' : 'برونزي',
                   achievement.tier)}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {achievement.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-bahrain-gold font-semibold">
                <span className="text-lg">🐚</span>
                {achievement.reward.pearls} {t('لؤلؤة', 'pearls')}
              </div>
              
              {unlocked && achievement.unlockedAt && (
                <span className="text-xs text-gray-500">
                  {t('تم الفتح في', 'Unlocked on')}{' '}
                  {new Date(achievement.unlockedAt).toLocaleDateString(language === 'ar' ? 'ar-BH' : 'en-US')}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
