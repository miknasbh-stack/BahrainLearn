import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SUBSCRIPTION_PLANS } from '@/constants/gamification';
import { ArrowLeft, Check, CreditCard, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function SubscriptionPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[1].id);
  const [paymentMethod, setPaymentMethod] = useState<'benefitpay' | 'card' | 'paypal'>('benefitpay');
  
  const handleSubscribe = () => {
    toast.success(
      t('تم الاشتراك بنجاح!', 'Subscription successful!'),
      {
        description: t(
          'مرحباً بك في عائلة تعلّم البحرين! ابدأ رحلتك التعليمية الآن.',
          'Welcome to Bahrain Learn family! Start your learning journey now.'
        ),
      }
    );
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bahrain-pearl via-white to-bahrain-sand/20">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('العودة للصفحة الرئيسية', 'Back to Home')}
        </Button>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-bahrain-gold" />
            {t('اختر باقتك المثالية', 'Choose Your Perfect Plan')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t(
              'تعليم مخصص بالذكاء الاصطناعي لأطفال البحرين - استثمر في مستقبل طفلك اليوم',
              'AI-powered personalized education for Bahraini children - Invest in your child\'s future today'
            )}
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                'relative transition-all duration-300 hover:shadow-2xl cursor-pointer',
                selectedPlan === plan.id ? 'ring-4 ring-primary shadow-2xl scale-105' : 'hover:scale-102',
                plan.popular && 'border-primary border-2'
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-bahrain-gold to-bahrain-sand text-white px-6 py-1 text-sm font-bold">
                    ⭐ {t('الأكثر شعبية', 'Most Popular')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl mb-2">
                  {language === 'ar' ? plan.nameAr : plan.nameEn}
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-primary">
                  {plan.price} {plan.currency}
                  <span className="text-base font-normal text-gray-600">
                    /{t('شهر', 'month')}
                  </span>
                </CardDescription>
                {plan.trialDays && (
                  <p className="text-sm text-green-600 font-semibold mt-2">
                    ✨ {plan.trialDays} {t('أيام تجربة مجانية', 'days free trial')}
                  </p>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button
                  className={cn(
                    'w-full font-bold text-lg py-6',
                    selectedPlan === plan.id && 'bg-primary shadow-lg'
                  )}
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <Check className="w-5 h-5 ml-2" />
                      {t('محدد', 'Selected')}
                    </>
                  ) : (
                    t('اختر هذه الباقة', 'Select This Plan')
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Payment Section */}
        <Card className="max-w-2xl mx-auto border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CreditCard className="w-6 h-6" />
              {t('طريقة الدفع', 'Payment Method')}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="benefitpay" className="gap-2">
                  <span className="text-xl">💳</span>
                  BenefitPay
                </TabsTrigger>
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  {t('بطاقة', 'Card')}
                </TabsTrigger>
                <TabsTrigger value="paypal" className="gap-2">
                  <span className="text-xl">🅿️</span>
                  PayPal
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="benefitpay" className="space-y-4 mt-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      B
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">BenefitPay</h3>
                      <p className="text-sm text-gray-600">{t('الدفع الآمن البحريني', 'Secure Bahraini Payment')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {t(
                      'ادفع بأمان باستخدام تطبيق BenefitPay على هاتفك المحمول',
                      'Pay securely using BenefitPay app on your mobile phone'
                    )}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="card" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">{t('رقم البطاقة', 'Card Number')}</Label>
                    <input
                      id="card-number"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                      dir="ltr"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">{t('تاريخ الانتهاء', 'Expiry Date')}</Label>
                      <input
                        id="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="w-full mt-2 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="paypal" className="space-y-4 mt-6">
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 rounded-xl border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      P
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">PayPal</h3>
                      <p className="text-sm text-gray-600">{t('دفع دولي آمن', 'Secure International Payment')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {t(
                      'سيتم تحويلك إلى PayPal لإكمال عملية الدفع بأمان',
                      'You will be redirected to PayPal to complete payment securely'
                    )}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Summary */}
            <div className="bg-gradient-to-r from-bahrain-gold/10 to-bahrain-sand/10 p-6 rounded-xl border-2 border-bahrain-gold/30">
              <h3 className="font-bold text-gray-900 mb-4">{t('ملخص الطلب', 'Order Summary')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {language === 'ar' 
                      ? SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.nameAr
                      : SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.nameEn
                    }
                  </span>
                  <span className="font-semibold">
                    {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price} BHD
                  </span>
                </div>
                {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.trialDays && (
                  <div className="text-sm text-green-600 font-semibold">
                    {t('تجربة مجانية لمدة', 'Free trial for')}{' '}
                    {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.trialDays}{' '}
                    {t('أيام', 'days')}
                  </div>
                )}
                <div className="border-t border-bahrain-gold/30 pt-2 mt-2 flex justify-between font-bold text-lg">
                  <span>{t('المجموع', 'Total')}</span>
                  <span className="text-primary">
                    {SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)?.price} BHD
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              onClick={handleSubscribe}
              size="lg"
              className="w-full font-bold text-lg py-6 bg-gradient-to-r from-primary to-bahrain-gulf hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              {t('ابدأ الاشتراك الآن', 'Start Subscription Now')}
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              {t(
                'بالنقر على "ابدأ الاشتراك"، فإنك توافق على شروط الخدمة وسياسة الخصوصية',
                'By clicking "Start Subscription", you agree to our Terms of Service and Privacy Policy'
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
