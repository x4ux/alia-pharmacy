import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAuth, useLanguage } from '../App';

const OTPVerificationPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  
  const { login } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('otpEmail');
    if (!storedEmail) {
      navigate('/signup');
      return;
    }
    setEmail(storedEmail);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (otp.length !== 6) {
      setError(language === 'ar' ? 'يرجى إدخال رمز مكون من 6 أرقام' : 'Please enter a 6-digit code');
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    setTimeout(() => {
      const storedOTP = localStorage.getItem('signupOTP');
      const pendingSignup = localStorage.getItem('pendingSignup');

      if (otp === storedOTP && pendingSignup) {
        const signupData = JSON.parse(pendingSignup);
        
        // Create user account
        const userData = {
          id: signupData.id,
          name: signupData.name,
          email: signupData.email,
          phone: signupData.phone,
          address: signupData.address,
          role: signupData.role,
          licenseNumber: signupData.licenseNumber,
          status: signupData.status,
          verified: true
        };

        // Store user data
        if (signupData.role === 'doctor') {
          // Store pending doctor request
          const pendingDoctors = JSON.parse(localStorage.getItem('pendingDoctors') || '[]');
          pendingDoctors.push(userData);
          localStorage.setItem('pendingDoctors', JSON.stringify(pendingDoctors));
          
          alert(language === 'ar' 
            ? 'تم إنشاء حسابك بنجاح! حسابك في انتظار موافقة الإدارة.'
            : 'Account created successfully! Your account is pending admin approval.'
          );
        } else {
          // Regular customer - login immediately
          login(userData);
        }

        // Clean up
        localStorage.removeItem('signupOTP');
        localStorage.removeItem('otpEmail');
        localStorage.removeItem('pendingSignup');

        setIsVerifying(false);
        navigate(signupData.role === 'doctor' ? '/login' : '/');
      } else {
        setError(language === 'ar' ? 'رمز التحقق غير صحيح' : 'Invalid verification code');
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (timeLeft > 0) return;
    
    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('signupOTP', newOtp);
    console.log('New OTP sent to email:', email, 'OTP:', newOtp);
    
    setTimeLeft(300);
    setError('');
    alert(language === 'ar' ? 'تم إرسال رمز جديد' : 'New code sent');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {language === 'ar' ? 'تحقق من بريدك الإلكتروني' : 'Verify Your Email'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' 
              ? `لقد أرسلنا رمز التحقق إلى ${email}`
              : `We sent a verification code to ${email}`
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'رمز التحقق (6 أرقام)' : 'Verification Code (6 digits)'}
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength={6}
              required
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setOtp(value);
                setError('');
              }}
              className={`block w-full px-4 py-3 text-center text-2xl font-mono border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="000000"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-gray-600">
                {language === 'ar' ? 'إعادة الإرسال خلال:' : 'Resend code in:'} {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                {language === 'ar' ? 'إعادة إرسال الرمز' : 'Resend Code'}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.length !== 6}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                {language === 'ar' ? 'جار التحقق...' : 'Verifying...'}
              </div>
            ) : (
              language === 'ar' ? 'تحقق من الرمز' : 'Verify Code'
            )}
          </button>

          <div className="text-center">
            <Link
              to="/signup"
              className="text-sm text-gray-600 hover:text-blue-500"
            >
              {language === 'ar' ? 'العودة للتسجيل' : 'Back to Sign Up'}
            </Link>
          </div>
        </form>

        {/* Demo OTP Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            {language === 'ar' ? 'للاختبار: تحقق من وحدة التحكم للحصول على رمز التحقق' : 'For testing: Check console for verification code'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;