import { useLanguage } from '@/hooks/useLanguage';
import { useStudentData } from '@/hooks/useStudentData';
import { useGamification } from '@/hooks/useGamification';
import { Subject } from '@/types';
import SubjectCard from '@/components/features/SubjectCard';
import MilestoneProgress from '@/components/features/MilestoneProgress';
import WeeklyChallengeCard from '@/components/features/WeeklyChallengeCard';
import { Button } from '@/components/ui/button';
import { BarChart3, BookOpen, Sparkles, Trophy, CreditCard } from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { student, progress } = useStudentData();
  const { stats } = useGamification();

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bahrain-pearl to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button
            onClick={() => navigate('/rewards')}
            size="lg"
            variant="outline"
            className="gap-2 p-6 h-auto justify-start border-2 border-bahrain-gold/30 hover:border-bahrain-gold bg-gradient-to-r from-bahrain-gold/5 to-transparent"
          >
            <Trophy className="w-6 h-6 text-bahrain-gold" />
            <div className="text-right flex-1">
              <p className="font-bold text-lg">{t('الإنجازات والمكافآت', 'Achievements & Rewards')}</p>
              <p className="text-sm text-gray-600">
                {stats.achievementsUnlocked.length} {t('إنجاز تم فتحه', 'achievements unlocked')}
              </p>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/subscribe')}
            size="lg"
            variant="outline"
            className="gap-2 p-6 h-auto justify-start border-2 border-primary/30 hover:border-primary bg-gradient-to-r from-primary/5 to-transparent"
          >
            <CreditCard className="w-6 h-6 text-primary" />
            <div className="text-right flex-1">
              <p className="font-bold text-lg">{t('الباقات والاشتراك', 'Plans & Subscription')}</p>
              <p className="text-sm text-gray-600">
                {t('من 10 د.ب شهرياً', 'From 10 BHD/month')}
              </p>
            </div>
          </Button>
        </div>

        {/* Milestone Progress */}
        <div className="mb-8">
          <MilestoneProgress />
        </div>

        {/* Weekly Challenge */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('التحدي الأسبوعي', 'Weekly Challenge')}
          </h2>
          <WeeklyChallengeCard />
        </div>

        {/* Welcome Hero */}
        <div className="bg-gradient-to-r from-primary to-bahrain-sand text-white rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {t(`مرحباً ${student.name}!`, `Welcome ${student.name}!`)}
              </h1>
              <p className="text-lg opacity-90">
                {t('جاهز للتعلم اليوم؟ اختر مادة لتبدأ رحلتك التعليمية', 'Ready to learn today? Choose a subject to start your educational journey')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/parent-dashboard')}
                variant="secondary"
                size="lg"
                className="gap-2 font-semibold"
              >
                <BarChart3 className="w-5 h-5" />
                {t('لوحة الأهل', 'Parent Dashboard')}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-600">{t('الصف', 'Grade')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{student.grade}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-bahrain-gold/30">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🐚</span>
              <span className="text-sm text-gray-600">{t('اللؤلؤ', 'Pearls')}</span>
            </div>
            <p className="text-2xl font-bold text-bahrain-gold">{student.pearlPoints}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">{t('المواد', 'Subjects')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{student.subjects.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">{t('المتوسط', 'Average')}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(progress.reduce((sum, p) => sum + p.completionPercentage, 0) / progress.length)}%
            </p>
          </div>
        </div>

        {/* Subjects Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-primary" />
            {t('موادك الدراسية', 'Your Subjects')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {progress.map((subjectProgress) => (
              <SubjectCard
                key={subjectProgress.subject}
                subject={subjectProgress.subject}
                completionPercentage={subjectProgress.completionPercentage}
                timeSpentMinutes={subjectProgress.timeSpentMinutes}
                currentTopic={subjectProgress.currentTopic}
                pearlsEarned={subjectProgress.pearlsEarned}
                onStart={() => navigate(`/lesson/${subjectProgress.subject}`)}
              />
            ))}
          </div>
        </div>

        {/* Motivational Section */}
        <div className="mt-8 bg-gradient-to-r from-bahrain-gold/20 to-bahrain-sand/20 rounded-2xl p-6 border-2 border-bahrain-gold/30">
          <div className="flex items-center gap-4">
            <div className="text-5xl animate-pearl-bounce">🎯</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {t('هدف اليوم', 'Today\'s Goal')}
              </h3>
              <p className="text-gray-700">
                {t('أكمل درساً واحداً في كل مادة لتحصل على 50 لؤلؤة إضافية!', 'Complete one lesson in each subject to earn 50 bonus pearls!')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
