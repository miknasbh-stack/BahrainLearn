import { useLanguage } from '@/hooks/useLanguage';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { BookOpen, Globe } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { student } = useStudentData();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-bahrain-gulf to-bahrain-sand rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {t('تعلّم البحرين', 'Bahrain Learn')}
              </h1>
              <p className="text-xs text-gray-500">
                {t('تعليم مخصص بالذكاء الاصطناعي', 'AI-Powered Learning')}
              </p>
            </div>
          </div>

          {/* Student Info & Language Toggle */}
          <div className="flex items-center gap-4">
            {student && (
              <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-bahrain-gold/10 to-bahrain-sand/10 px-4 py-2 rounded-lg border border-bahrain-gold/30">
                <span className="text-2xl animate-pearl-bounce">🐚</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                  <p className="text-xs text-bahrain-gold font-bold">
                    {student.pearlPoints} {t('لؤلؤة', 'Pearls')}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'English' : 'عربي'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
