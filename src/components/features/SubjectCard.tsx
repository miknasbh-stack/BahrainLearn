import { Subject } from '@/types';
import { SUBJECTS } from '@/constants/subjects';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Award } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  completionPercentage: number;
  timeSpentMinutes: number;
  currentTopic: string;
  pearlsEarned: number;
  onStart: () => void;
}

export default function SubjectCard({
  subject,
  completionPercentage,
  timeSpentMinutes,
  currentTopic,
  pearlsEarned,
  onStart,
}: SubjectCardProps) {
  const { t } = useLanguage();
  const subjectInfo = SUBJECTS[subject];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
      <div
        className="h-2"
        style={{ backgroundColor: subjectInfo.color }}
      />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm"
              style={{ backgroundColor: `${subjectInfo.color}15` }}
            >
              {subjectInfo.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{subjectInfo.nameAr}</h3>
              <p className="text-sm text-gray-500">{subjectInfo.nameEn}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-bahrain-gold/10 px-3 py-1 rounded-full">
            <span className="text-lg">🐚</span>
            <span className="text-sm font-bold text-bahrain-gold">{pearlsEarned}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">{subjectInfo.description}</p>

        {/* Progress */}
        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-gray-700">
                {t('التقدم', 'Progress')}
              </span>
              <span className="text-xs font-bold" style={{ color: subjectInfo.color }}>
                {completionPercentage}%
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timeSpentMinutes} {t('دقيقة', 'min')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span className="font-medium">{currentTopic}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="w-full font-semibold"
          style={{ backgroundColor: subjectInfo.color }}
        >
          {t('ابدأ الدرس', 'Start Lesson')}
        </Button>
      </CardContent>
    </Card>
  );
}
