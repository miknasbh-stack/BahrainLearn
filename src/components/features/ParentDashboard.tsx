import { useStudentData } from '@/hooks/useStudentData';
import { useLanguage } from '@/hooks/useLanguage';
import { SUBJECTS } from '@/constants/subjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Award, Calendar } from 'lucide-react';

export default function ParentDashboard() {
  const { t } = useLanguage();
  const { student, progress, recentActivities } = useStudentData();

  if (!student) return null;

  const totalTimeThisWeek = progress.reduce((sum, p) => sum + p.timeSpentMinutes, 0);
  const pearlsThisWeek = progress.reduce((sum, p) => sum + p.pearlsEarned, 0);
  const averageCompletion = Math.round(
    progress.reduce((sum, p) => sum + p.completionPercentage, 0) / progress.length
  );

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t('التقدم الإجمالي', 'Overall Progress')}
                </p>
                <p className="text-3xl font-bold text-primary">{averageCompletion}%</p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-bahrain-gold/20 bg-gradient-to-br from-bahrain-gold/5 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t('اللؤلؤ هذا الأسبوع', 'Pearls This Week')}
                </p>
                <p className="text-3xl font-bold text-bahrain-gold">{pearlsThisWeek} 🐚</p>
              </div>
              <div className="w-16 h-16 bg-bahrain-gold/10 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-bahrain-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {t('وقت التعلم', 'Learning Time')}
                </p>
                <p className="text-3xl font-bold text-green-600">{totalTimeThisWeek}</p>
                <p className="text-xs text-gray-500">{t('دقيقة', 'minutes')}</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            {t('التقدم حسب المادة', 'Progress by Subject')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progress.map((subjectProgress) => {
              const subjectInfo = SUBJECTS[subjectProgress.subject];
              return (
                <div key={subjectProgress.subject} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                        style={{ backgroundColor: `${subjectInfo.color}15` }}
                      >
                        {subjectInfo.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{subjectInfo.nameAr}</p>
                        <p className="text-xs text-gray-500">{subjectProgress.currentTopic}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: subjectInfo.color }}>
                        {subjectProgress.completionPercentage}%
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{subjectProgress.timeSpentMinutes} {t('د', 'min')}</span>
                        <span>•</span>
                        <span>{subjectProgress.pearlsEarned} 🐚</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={subjectProgress.completionPercentage} className="h-2" />
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${subjectInfo.color}15`,
                        color: subjectInfo.color,
                      }}
                    >
                      {t(
                        subjectProgress.masteryLevel === 'advanced' ? 'متقدم' :
                        subjectProgress.masteryLevel === 'intermediate' ? 'متوسط' : 'مبتدئ',
                        subjectProgress.masteryLevel
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            {t('الأنشطة الأخيرة', 'Recent Activities')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    activity.score && activity.score >= 80 ? 'bg-green-500' :
                    activity.score && activity.score >= 60 ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}>
                    {activity.score}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('درس مكتمل', 'Lesson Completed')}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timeSpent} {t('دقيقة', 'min')}</span>
                      {activity.struggledConcepts.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-orange-600">
                            {t('صعوبات في بعض المفاهيم', 'Some struggles')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-bahrain-gold font-bold">+{activity.pearlsEarned} 🐚</p>
                  <p className="text-xs text-gray-500">
                    {activity.completedAt?.toLocaleDateString('ar-BH')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            💡 {t('توصيات للأهل', 'Recommendations for Parents')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-blue-900">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t(
                  'أحمد يتقدم بشكل ممتاز في اللغة العربية. شجعه على قراءة قصص بحرينية إضافية.',
                  'Ahmed is progressing excellently in Arabic. Encourage him to read additional Bahraini stories.'
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t(
                  'يحتاج إلى المزيد من التدريب في اللغة الإنجليزية. خصص 15 دقيقة يومياً للممارسة.',
                  'Needs more practice in English. Allocate 15 minutes daily for practice.'
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>
                {t(
                  'متميز في الرياضيات! يمكنك تحديه بمسائل كلامية باستخدام أمثلة من الحياة اليومية.',
                  'Excellent in Math! You can challenge him with word problems using daily life examples.'
                )}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
