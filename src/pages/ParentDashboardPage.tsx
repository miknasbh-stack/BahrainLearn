import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { useStudentData } from '@/hooks/useStudentData';
import ParentDashboard from '@/components/features/ParentDashboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ParentDashboardPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { student } = useStudentData();

  const handleDownloadReport = () => {
    toast.success(
      t('تم إنشاء التقرير الأسبوعي', 'Weekly Report Generated'),
      {
        description: t('سيتم إرسال التقرير إلى بريدك الإلكتروني', 'Report will be sent to your email'),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bahrain-pearl to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('العودة', 'Back')}
          </Button>

          <Button
            onClick={handleDownloadReport}
            className="gap-2 bg-bahrain-gulf hover:bg-bahrain-gulf/90"
          >
            <Download className="w-4 h-4" />
            {t('تحميل التقرير الأسبوعي', 'Download Weekly Report')}
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('لوحة تحكم الأهل', 'Parent Dashboard')}
          </h1>
          <p className="text-gray-600">
            {t(
              `متابعة تقدم ${student?.name} في جميع المواد`,
              `Track ${student?.name}'s progress across all subjects`
            )}
          </p>
        </div>

        <ParentDashboard />
      </div>
    </div>
  );
}
