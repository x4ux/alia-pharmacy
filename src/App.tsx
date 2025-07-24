import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RequestMedicine from './pages/RequestMedicine';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import OffersPage from './pages/OffersPage';

// Auth Context
interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Language Context
interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.offers': 'Offers',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'hero.title': 'Your Trusted Online Pharmacy',
    'hero.subtitle': 'Quality medicines delivered to your doorstep across Egypt',
    'search.placeholder': 'Search for medicines...'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.categories': 'الأقسام',
    'nav.offers': 'العروض',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    'hero.title': 'صيدلية علياء علي - صيدليتك الموثوقة',
    'hero.subtitle': 'أدوية عالية الجودة توصل إلى باب منزلك في جميع أنحاء مصر',
    'search.placeholder': 'البحث عن الأدوية...'
  }
};

function App() {
  const [user, setUser] = useState<any>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'doctor';

  // Check for stored user on app load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
        <Router>
          <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/request-medicine" element={
                user ? <RequestMedicine /> : <Navigate to="/login" />
              } />
              <Route path="/dashboard" element={
                isAdmin ? <Dashboard /> : <Navigate to="/login" />
              } />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/offers" element={<OffersPage />} />
            </Routes>
          </div>
        </Router>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;