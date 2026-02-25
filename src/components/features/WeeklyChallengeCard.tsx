import { useLanguage } from '@/hooks/useLanguage';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy } from 'lucide-react';

export default function WeeklyChallengeCard() {
  const { t, language } = useLanguage();
  const { weeklyChallenge } = useGamification();
  
  if (!weeklyChallenge) return null;
  
  const progressPercentage = (weeklyChallenge.progress / weeklyChallenge.goal.target) * 100;
  const daysLeft = Math.ceil((weeklyChallenge.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card className={`border-2 ${weeklyChallenge.completed ? 'bg-green-50 border-green-500' : 'bg-gradient-to-br from-primary/5 to-bahrain-gulf/5 border-primary'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="text-2xl">{weeklyChallenge.icon}</span>
            {language === 'ar' ? weeklyChallenge.nameAr : weeklyChallenge.nameEn}
          </CardTitle>
          {weeklyChallenge.completed ? (
            <Badge className="bg-green-600">
              <Trophy className="w-3 h-3 mr-1" />
              {t('مكتمل!', 'Completed!')}
            </Badge>
          ) : (
            <Badge variant="outline" className="gap-1">
              <Calendar className="w-3 h-3" />
              {daysLeft} {t('أيام', 'days')}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700">
          {weeklyChallenge.description}
        </p>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-900">
              {weeklyChallenge.progress} / {weeklyChallenge.goal.target}
            </span>
            <span className="text-xs text-gray-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between bg-bahrain-gold/10 p-3 rounded-lg border border-bahrain-gold/30">
          <span className="text-sm font-medium text-gray-700">
            {t('المكافأة:', 'Reward:')}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg">🐚</span>
            <span className="font-bold text-bahrain-gold">
              {weeklyChallenge.reward.pearls} {t('لؤلؤة', 'pearls')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
