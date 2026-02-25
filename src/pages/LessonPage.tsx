import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useStudentData } from '@/hooks/useStudentData';
import { useGamification } from '@/hooks/useGamification';
import { mockMathLesson } from '@/lib/mockData';
import { Subject } from '@/types';
import LessonViewer from '@/components/features/LessonViewer';
import CelebrationModal from '@/components/features/CelebrationModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function LessonPage() {
  const { subject } = useParams<{ subject: Subject }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addPearls, addActivity, updateProgress, progress } = useStudentData();
  const { updateProgress: updateGamificationProgress, checkAchievements } = useGamification();
  const [celebrationAchievement, setCelebrationAchievement] = useState<any>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleLessonComplete = (score: number, timeSpent: number, struggledConcepts: string[]) => {
    const pearls = Math.floor(score / 10) + (score >= 90 ? 10 : 0) + (timeSpent < 20 ? 5 : 0);
    
    // Add pearls
    addPearls(pearls);
    
    // Add activity
    addActivity({
      lessonId: mockMathLesson.id,
      studentId: '1',
      completedAt: new Date(),
      score,
      timeSpent,
      struggledConcepts,
      pearlsEarned: pearls,
    });
    
    // Update progress
    const currentProgress = progress.find(p => p.subject === subject);
    if (currentProgress) {
      updateProgress({
        ...currentProgress,
        completionPercentage: Math.min(100, currentProgress.completionPercentage + 5),
        timeSpentMinutes: currentProgress.timeSpentMinutes + timeSpent,
        pearlsEarned: currentProgress.pearlsEarned + pearls,
        lastActivity: new Date(),
      });
    }
    
    // Update gamification stats
    updateGamificationProgress('lessons', 1);
    updateGamificationProgress('pearls', pearls);
    updateGamificationProgress('score', score);
    
    // Check for new achievements
    const newAchievements = checkAchievements();
    if (newAchievements.length > 0) {
      setCelebrationAchievement(newAchievements[0]);
      setShowCelebration(true);
    }
    
    toast.success(
      t(
        `رائع! حصلت على ${pearls} لؤلؤة جديدة 🐚`,
        `Amazing! You earned ${pearls} new pearls 🐚`
      ),
      {
        description: t(
          `درجتك: ${score}% - واصل التميز!`,
          `Your score: ${score}% - Keep it up!`
        ),
      }
    );
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
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

        <LessonViewer lesson={mockMathLesson} onComplete={handleLessonComplete} />
        
        <CelebrationModal
          achievement={celebrationAchievement}
          open={showCelebration}
          onClose={() => setShowCelebration(false)}
        />
      </div>
    </div>
  );
}
