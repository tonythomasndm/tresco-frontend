import React, { useState, useRef } from 'react';
import { ShieldCheck, ArrowRight, HelpCircle, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const OTPForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Take only the last character if they pasted multiple or something
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if typing a digit
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate verification
    navigate('/dashboard');
  };

  return (
    <div className="w-full flex justify-center lg:justify-start lg:ml-[10%] py-10 px-6 min-h-[70vh] relative bg-[#f8fafc] lg:bg-transparent flex-col items-center">

      {/* Top Main Block */}
      <div className="w-full max-w-[420px] flex flex-col items-center justify-center relative z-10">

        {/* Shield Icon Container */}
        <div className="w-16 h-16 bg-[#f1f5f9] rounded-2xl flex items-center justify-center mb-8">
          <ShieldCheck className="text-[#1c3c66]" size={32} strokeWidth={2.5} />
        </div>

        {/* Headings */}
        <div className="text-center mb-10 w-full">
          <h2 className="text-[28px] lg:text-[32px] font-extrabold tracking-tight text-[#0a152e] mb-3">
            Two-Step Verification
          </h2>
          <p className="text-slate-500 font-medium text-sm lg:text-[15px] leading-relaxed">
            Enter the 6-digit code sent to your email<br />
            <span className="font-bold text-[#1c3c66]">admin@steelinsight.com</span>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-3xl p-8 w-full">
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* 6 Grid OTP inputs */}
            <div className="flex justify-between items-center sm:gap-2">
              {otp.map((digit, index) => (
                <React.Fragment key={`otp-input-${index}`}>
                  <input
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={handleFocus}
                    className="w-10 sm:w-[48px] h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 border-transparent bg-[#f1f5f9] text-[#0a152e] focus:border-[#1c3c66] focus:bg-white focus:outline-none transition-all placeholder:text-[#cbd5e1]"
                  />
                  {/* Divider Dot after the 3rd input */}
                  {index === 2 && (
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#cbd5e1] flex-shrink-0 mx-1 sm:mx-2"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-[#1c3c66] hover:bg-[#122b4f] text-white py-[14px] rounded-xl font-bold tracking-[0.05em] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#1c3c66]/20 mt-2"
            >
              VERIFY IDENTITY
              <ArrowRight className="w-4 h-4 ml-1" strokeWidth={3} />
            </button>

            {/* Resend Link */}
            <div className="text-center border-t border-slate-100 pt-6 mt-2">
              <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                Didn't receive the code?{' '}
              </span>
              <button
                type="button"
                className="text-[11px] font-bold text-[#1c3c66] hover:text-[#0a152e] uppercase tracking-wider hover:underline transition-all"
              >
                Resend Code
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* Footer Links */}
      <div className="absolute bottom-8 lg:bottom-10 w-full flex items-center justify-center space-x-6 text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">
        <Link to="/support" className="flex items-center hover:text-[#64748b] transition-colors">
          <HelpCircle size={14} className="mr-1.5 opacity-80" strokeWidth={2.5} />
          Support
        </Link>
        <div className="w-1 h-1 bg-[#cbd5e1] rounded-full"></div>
        <Link to="/privacy" className="flex items-center hover:text-[#64748b] transition-colors">
          <Globe size={14} className="mr-1.5 opacity-80" strokeWidth={2.5} />
          Privacy
        </Link>
      </div>

    </div>
  );
};

export default OTPForm;
