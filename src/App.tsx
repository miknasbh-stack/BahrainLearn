import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/layout/Header';
import HomePage from '@/pages/HomePage';
import LessonPage from '@/pages/LessonPage';
import ParentDashboardPage from '@/pages/ParentDashboardPage';

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
        </Routes>
        <Toaster position={language === 'ar' ? 'top-left' : 'top-right'} />
      </div>
    </BrowserRouter>
  );
}

export default App;
