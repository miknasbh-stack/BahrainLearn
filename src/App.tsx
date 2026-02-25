import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import HomePage from '@/pages/HomePage';
import LessonPage from '@/pages/LessonPage';
import ParentDashboardPage from '@/pages/ParentDashboardPage';
import RewardsPage from '@/pages/RewardsPage';
import SubscriptionPage from '@/pages/SubscriptionPage';

function App() {
  const { language } = useLanguage();

  return (
    <BrowserRouter>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lesson/:subject" element={<LessonPage />} />
          <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/subscribe" element={<SubscriptionPage />} />
        </Routes>
        <Toaster position={language === 'ar' ? 'top-left' : 'top-right'} />
      </div>
    </BrowserRouter>
  );
}

export default App;
