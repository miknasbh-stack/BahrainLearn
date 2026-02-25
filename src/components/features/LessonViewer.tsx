import { useState } from 'react';
import { Lesson, Question } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';
import { AdaptiveLessonEngine } from '@/lib/lessonEngine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Lightbulb, Sparkles, ArrowRight } from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: (score: number, timeSpent: number, struggledConcepts: string[]) => void;
}

export default function LessonViewer({ lesson, onComplete }: LessonViewerProps) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, any>>({});
  const [showSimplified, setShowSimplified] = useState(false);
  const [startTime] = useState(Date.now());
  const [engine] = useState(new AdaptiveLessonEngine());

  const totalSteps = lesson.content.mainContent.length + lesson.content.practice.length + 2; // +2 for intro and summary
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (question: Question, answer: string) => {
    const result = engine.checkAnswer(question, answer);
    setAnswers({ ...answers, [question.id]: answer });
    setFeedback({ ...feedback, [question.id]: result });

    if (result.adaptiveResponse) {
      setShowSimplified(true);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setShowSimplified(false);
    } else {
      // Calculate final score
      const correctAnswers = Object.values(feedback).filter(f => f.isCorrect).length;
      const score = Math.round((correctAnswers / lesson.content.practice.length) * 100);
      const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
      const struggledConcepts = Object.entries(feedback)
        .filter(([_, f]) => !f.isCorrect)
        .map(([id, _]) => {
          const question = lesson.content.practice.find(q => q.id === id);
          return question?.question || '';
        });

      onComplete(score, timeSpent, struggledConcepts);
    }
  };

  const renderIntroduction = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-primary/10 to-bahrain-sand/10 p-6 rounded-xl border-r-4 border-primary">
        <p className="text-lg leading-relaxed text-gray-800">
          {lesson.content.introduction}
        </p>
      </div>
      {lesson.culturalContext && (
        <Alert className="border-bahrain-gold bg-bahrain-gold/5">
          <Sparkles className="h-5 w-5 text-bahrain-gold" />
          <AlertDescription className="text-bahrain-gold font-medium">
            {t('سياق بحريني:', 'Bahraini Context:')} {lesson.culturalContext}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderContent = (block: any, index: number) => (
    <div key={index} className="space-y-4 animate-fade-in">
      {block.type === 'text' && (
        <p className="text-lg leading-relaxed text-gray-800">{block.content}</p>
      )}
      
      {block.type === 'example' && (
        <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <p className="font-semibold text-green-900">{block.content}</p>
              {block.bahrainExample && (
                <p className="text-sm text-green-700 bg-white p-3 rounded">
                  {block.bahrainExample}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {block.imageUrl && (
        <img
          src={block.imageUrl}
          alt={block.content}
          className="w-full max-w-md mx-auto rounded-xl shadow-lg"
        />
      )}
      
      {block.type === 'interactive' && (
        <Alert className="border-primary bg-primary/5">
          <AlertDescription className="text-primary font-medium text-base">
            ✏️ {block.content}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderQuestion = (question: Question, index: number) => {
    const userAnswer = answers[question.id];
    const questionFeedback = feedback[question.id];

    return (
      <div key={question.id} className="space-y-6 animate-fade-in">
        <div className="bg-primary/5 p-6 rounded-xl border-r-4 border-primary">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            {t('سؤال', 'Question')} {index + 1}: {question.question}
          </p>
          
          <div className="space-y-3">
            {question.options?.map((option) => {
              const isSelected = userAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showResult = userAnswer !== undefined;

              return (
                <button
                  key={option}
                  onClick={() => !userAnswer && handleAnswer(question, option)}
                  disabled={userAnswer !== undefined}
                  className={`
                    w-full text-right p-4 rounded-lg border-2 transition-all duration-200
                    ${!showResult && 'hover:border-primary hover:bg-primary/5 cursor-pointer'}
                    ${isSelected && !showResult && 'border-primary bg-primary/10'}
                    ${showResult && isSelected && isCorrect && 'border-green-500 bg-green-50'}
                    ${showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50'}
                    ${showResult && !isSelected && isCorrect && 'border-green-500 bg-green-50'}
                    ${showResult && !isSelected && 'border-gray-200 bg-gray-50 opacity-60'}
                    ${userAnswer && 'cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">{option}</span>
                    {showResult && isSelected && (
                      isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )
                    )}
                    {showResult && !isSelected && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {questionFeedback && (
          <Alert className={questionFeedback.isCorrect ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}>
            <AlertDescription className="space-y-2">
              <p className={questionFeedback.isCorrect ? 'text-green-900' : 'text-orange-900'}>
                {questionFeedback.feedback}
              </p>
              {questionFeedback.adaptiveResponse && (
                <p className="text-orange-700 font-semibold mt-3 pt-3 border-t border-orange-200">
                  {questionFeedback.adaptiveResponse}
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}

        {showSimplified && (
          <div className="bg-blue-50 border-2 border-blue-300 p-6 rounded-xl">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {t('شرح مبسط مع أمثلة بحرينية', 'Simplified Explanation with Bahraini Examples')}
            </h4>
            <div className="text-blue-800 whitespace-pre-line">
              {engine.getSimplifiedExplanation(lesson.topic)}
              {engine.getBahrainExample(lesson.topic)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSummary = () => {
    const correctAnswers = Object.values(feedback).filter(f => f.isCorrect).length;
    const totalQuestions = lesson.content.practice.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const pearls = engine.getPearlReward(score, Math.round((Date.now() - startTime) / 1000 / 60));

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-br from-bahrain-gold/20 to-bahrain-sand/20 p-8 rounded-2xl border-2 border-bahrain-gold/50 text-center">
          <div className="text-6xl mb-4 animate-pearl-bounce">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('أحسنت!', 'Well Done!')}
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            {t('لقد أكملت الدرس بنجاح', 'You completed the lesson successfully')}
          </p>
          
          <div className="flex justify-center gap-8 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-3xl font-bold text-primary">{score}%</p>
              <p className="text-sm text-gray-600">{t('النتيجة', 'Score')}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-3xl font-bold text-bahrain-gold">{pearls} 🐚</p>
              <p className="text-sm text-gray-600">{t('لؤلؤ جديد', 'New Pearls')}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl text-right">
            <h4 className="font-bold text-gray-900 mb-3">
              {t('ملخص الدرس:', 'Lesson Summary:')}
            </h4>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {lesson.content.summary}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getCurrentContent = () => {
    if (currentStep === 0) {
      return renderIntroduction();
    }
    
    const contentBlocks = lesson.content.mainContent.length;
    if (currentStep <= contentBlocks) {
      return renderContent(lesson.content.mainContent[currentStep - 1], currentStep - 1);
    }
    
    const questionIndex = currentStep - contentBlocks - 1;
    if (questionIndex < lesson.content.practice.length) {
      return renderQuestion(lesson.content.practice[questionIndex], questionIndex);
    }
    
    return renderSummary();
  };

  const canProceed = () => {
    const contentBlocks = lesson.content.mainContent.length;
    const questionIndex = currentStep - contentBlocks - 1;
    
    if (questionIndex >= 0 && questionIndex < lesson.content.practice.length) {
      const currentQuestion = lesson.content.practice[questionIndex];
      return answers[currentQuestion.id] !== undefined;
    }
    
    return true;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-bahrain-sand/5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{lesson.topic}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{Math.round(lesson.estimatedMinutes)} {t('دقيقة', 'min')}</span>
            </div>
          </div>
          <div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {t('الخطوة', 'Step')} {currentStep + 1} {t('من', 'of')} {totalSteps}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {getCurrentContent()}
        
        <div className="flex justify-end mt-8">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            size="lg"
            className="gap-2 font-semibold"
          >
            {currentStep === totalSteps - 1 ? (
              t('إنهاء الدرس', 'Finish Lesson')
            ) : (
              <>
                {t('التالي', 'Next')}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
