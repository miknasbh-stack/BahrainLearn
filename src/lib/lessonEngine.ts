import { Lesson, Question } from '@/types';

export class AdaptiveLessonEngine {
  private currentDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
  private strugglingCount: number = 0;
  private successCount: number = 0;

  checkAnswer(question: Question, userAnswer: string): {
    isCorrect: boolean;
    feedback: string;
    adaptiveResponse?: string;
  } {
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      this.successCount++;
      this.strugglingCount = 0;
      
      if (this.successCount >= 3 && this.currentDifficulty !== 'hard') {
        return {
          isCorrect: true,
          feedback: question.explanation,
          adaptiveResponse: '🌟 ممتاز! أنت تتقدم بشكل رائع. سأزيد مستوى التحدي قليلاً.',
        };
      }

      return {
        isCorrect: true,
        feedback: question.explanation,
      };
    } else {
      this.strugglingCount++;
      this.successCount = 0;

      if (this.strugglingCount >= 2) {
        return {
          isCorrect: false,
          feedback: `${question.explanation}\n\n💡 دعني أساعدك: ${question.adaptiveHint || 'حاول مرة أخرى بتركيز'}`,
          adaptiveResponse: '🤝 لا بأس! سأشرح بطريقة أبسط مع المزيد من الأمثلة البحرينية.',
        };
      }

      return {
        isCorrect: false,
        feedback: question.explanation,
      };
    }
  }

  shouldSimplifyContent(): boolean {
    return this.strugglingCount >= 2;
  }

  getSimplifiedExplanation(topic: string): string {
    const simplifications: Record<string, string> = {
      'الكسور البسيطة': `
        دعنا نفكر في هذا بطريقة أبسط:
        
        🍰 تخيل كعكة بحرينية لذيذة
        • إذا قطعتها إلى نصفين، كل قطعة = ½ (نصف)
        • إذا قطعتها إلى 4 قطع، كل قطعة = ¼ (ربع)
        
        💰 مثال بالنقود:
        • 1 دينار = 1000 فلس
        • نصف دينار = 500 فلس
        • ربع دينار = 250 فلس
        
        الآن جرّب مرة أخرى!
      `,
    };

    return simplifications[topic] || 'دعني أشرح بطريقة مختلفة...';
  }

  getBahrainExample(topic: string): string {
    const examples: Record<string, string> = {
      'الكسور البسيطة': `
        🏰 مثال من برج البحرين التجاري:
        البرج له برجين متماثلين. كل برج يمثل ½ (نصف) من المبنى.
        
        🌊 مثال من شاطئ البحرين:
        إذا قضيت 4 ساعات على الشاطئ، كل ساعة = ¼ (ربع) من الوقت.
      `,
    };

    return examples[topic] || '';
  }

  getPearlReward(score: number, timeSpent: number): number {
    let pearls = Math.floor(score / 10);
    
    // Bonus for quick completion
    if (timeSpent < 20) {
      pearls += 5;
    }
    
    // Bonus for high score
    if (score >= 90) {
      pearls += 10;
    }
    
    return pearls;
  }
}
