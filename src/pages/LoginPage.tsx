import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer' // customer, doctor, admin
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check if user exists and is approved
      let userData = null;
      
      // Check approved doctors
      const approvedDoctors = JSON.parse(localStorage.getItem('approvedDoctors') || '[]');
      const doctor = approvedDoctors.find((doc: any) => doc.email === formData.email);
      
      if (doctor && formData.userType === 'doctor') {
        userData = doctor;
      } else if (formData.userType === 'customer') {
        // Mock customer login
        userData = {
          id: Math.random().toString(36).substr(2, 9),
          name: 'Ahmed Mohamed',
          email: formData.email,
          role: 'customer',
          phone: '01234567890',
          address: 'Cairo, Egypt',
          status: 'active',
          verified: true
        };
      } else if (formData.userType === 'admin') {
        // Mock admin login
        userData = {
          id: 'admin-1',
          name: 'Admin User',
          email: formData.email,
          role: 'admin',
          phone: '01234567890',
          status: 'active',
          verified: true
        };
      }
      
      if (userData) {
        login(userData);
      } else {
        alert(language === 'ar' 
          ? 'بيانات الدخول غير صحيحة أو الحساب غير مفعل'
          : 'Invalid credentials or account not activated'
        );
      }
      setIsLoading(false);
      
      // Redirect based on user type
      if (userData && (userData.role === 'admin' || userData.role === 'doctor')) {
        navigate('/dashboard');
      } else if (userData) {
        navigate('/');
      }
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' ? 'أو' : 'Or'}{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              {language === 'ar' ? 'إنشاء حساب جديد' : 'create a new account'}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* User Type Selection */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'نوع المستخدم' : 'User Type'}
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="customer">
                  {language === 'ar' ? 'عميل' : 'Customer'}
                </option>
                <option value="doctor">
                  {language === 'ar' ? 'طبيب' : 'Doctor'}
                </option>
                <option value="admin">
                  {language === 'ar' ? 'مدير' : 'Admin'}
                </option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 pr-10 rtl:pr-3 rtl:pl-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 rtl:ml-0 rtl:mr-2 block text-sm text-gray-900">
                {language === 'ar' ? 'تذكرني' : 'Remember me'}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                  {language === 'ar' ? 'جار تسجيل الدخول...' : 'Signing in...'}
                </div>
              ) : (
                language === 'ar' ? 'تسجيل الدخول' : 'Sign in'
              )}
            </button>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">
              {language === 'ar' ? 'بيانات تجريبية:' : 'Demo Credentials:'}
            </h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>{language === 'ar' ? 'عميل:' : 'Customer:'}</strong> customer@example.com / password123</p>
              <p><strong>{language === 'ar' ? 'طبيب:' : 'Doctor:'}</strong> doctor@example.com / password123</p>
              <p><strong>{language === 'ar' ? 'مدير:' : 'Admin:'}</strong> admin@example.com / password123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;