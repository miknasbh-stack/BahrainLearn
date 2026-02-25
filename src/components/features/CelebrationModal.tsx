import { useEffect, useState } from 'react';
import { Achievement } from '@/types/gamification';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { TIER_GRADIENTS } from '@/constants/gamification';
import { cn } from '@/lib/utils';

interface CelebrationModalProps {
  achievement: Achievement | null;
  open: boolean;
  onClose: () => void;
}

export default function CelebrationModal({ achievement, open, onClose }: CelebrationModalProps) {
  const { t, language } = useLanguage();
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);
  
  useEffect(() => {
    if (open && achievement) {
      // Generate confetti elements
      const newConfetti = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);
    }
  }, [open, achievement]);
  
  if (!achievement) return null;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confetti.map((item) => (
            <div
              key={item.id}
              className="absolute -top-4 animate-confetti-fall"
              style={{
                left: `${item.left}%`,
                animationDelay: `${item.delay}s`,
              }}
            >
              {['🎉', '🌟', '🐚', '✨', '🏆'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
        
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {t('إنجاز جديد!', 'New Achievement!')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-6">
          {/* Achievement Icon */}
          <div className={cn(
            'w-32 h-32 rounded-full flex items-center justify-center text-6xl bg-gradient-to-br shadow-2xl animate-achievement-bounce',
            TIER_GRADIENTS[achievement.tier]
          )}>
            {achievement.icon}
          </div>
          
          {/* Achievement Name */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? achievement.nameAr : achievement.nameEn}
            </h3>
            <p className="text-gray-600">
              {achievement.description}
            </p>
          </div>
          
          {/* Reward Display */}
          <div className="bg-gradient-to-r from-bahrain-gold/20 to-bahrain-sand/20 p-6 rounded-xl border-2 border-bahrain-gold/40 w-full">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-bahrain-gold animate-pulse" />
              <span className="text-lg font-semibold text-gray-900">
                {t('حصلت على', 'You earned')}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-3xl animate-pearl-bounce">🐚</span>
                <span className="text-2xl font-bold text-bahrain-gold">
                  {achievement.reward.pearls}
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {t('لؤلؤة!', 'pearls!')}
              </span>
            </div>
          </div>
          
          {/* Cultural Message based on tier */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 w-full">
            <p className="text-sm text-center text-gray-700 italic">
              {achievement.tier === 'pearl' && t(
                '🌟 إنجاز نادر! مثل اللؤلؤة البحرينية الثمينة، تميزك استثنائي',
                '🌟 Rare achievement! Like precious Bahraini pearls, your excellence is exceptional'
              )}
              {achievement.tier === 'gold' && t(
                '👑 إنجاز ذهبي! أنت تسير على خطى عظماء البحرين',
                '👑 Golden achievement! You walk in the footsteps of Bahrain\'s greats'
              )}
              {achievement.tier === 'silver' && t(
                '⭐ إنجاز رائع! مثل فضة الخليج اللامعة',
                '⭐ Amazing achievement! Like the shining silver of the Gulf'
              )}
              {achievement.tier === 'bronze' && t(
                '🎯 إنجاز ممتاز! بداية رحلة عظيمة',
                '🎯 Excellent achievement! The beginning of a great journey'
              )}
            </p>
          </div>
          
          <Button
            onClick={onClose}
            size="lg"
            className="w-full gap-2 font-semibold text-lg"
          >
            {t('رائع! واصل التميز', 'Awesome! Keep Going')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
