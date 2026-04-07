import { useState } from 'react';
import type { FormEvent } from 'react';
import { User, Mail, Lock, EyeOff, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import FormInput from './FormInput';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-center lg:justify-start lg:ml-[10%] py-10 px-6 lg:bg-transparent min-h-[70vh] relative">
      <div className="w-full max-w-[420px] flex flex-col justify-center">
        
        {/* Mobile Headings */}
        <div className="mb-8 lg:hidden text-center lg:text-left mt-[-20px]">
          <h2 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-1">Create Account</h2>
          <p className="text-slate-500 text-sm">Start your high-fidelity data journey today.</p>
        </div>

        {/* Desktop Headings */}
        <div className="mb-10 hidden lg:block">
          <h2 className="text-[32px] font-extrabold tracking-tight text-[#0a152e] mb-2 font-sans">Begin your journey</h2>
          <p className="text-slate-500 font-medium">Precision-crafted tools for modern analysis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
          <FormInput 
            label={<span className="lg:hidden text-[9px]">FULL NAME</span>} 
            placeholder="Alexander Pierce" 
            icon={<User className="w-[18px] h-[18px]" />} 
            className="lg:hidden"
          />
          <FormInput 
            label={<span className="hidden lg:inline text-[10px]">FULL NAME</span>} 
            placeholder="Johnathan Sterling" 
            icon={<User className="w-[18px] h-[18px]" />} 
            className="hidden lg:flex"
          />
          
          <FormInput 
             label={<span className="lg:hidden text-[9px]">STRATEGY EMAIL</span>} 
             placeholder="a.pierce@precisionlens.com" 
             type="email"
             icon={<Mail className="w-[18px] h-[18px]" />} 
             className="lg:hidden"
          />
          <FormInput 
             label={<span className="hidden lg:inline text-[10px]">EMAIL ADDRESS</span>} 
             placeholder="strategy@architect.io" 
             type="email"
             icon={<Mail className="w-[18px] h-[18px]" />} 
             className="hidden lg:flex"
          />
          
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-5">
            <FormInput 
              label={<span className="lg:hidden text-[9px]">SECURE PASSWORD</span>} 
              placeholder="••••••••••••" 
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />} 
              endIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                  {showPassword ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
                </button>
              }
              className="lg:hidden"
            />
            <FormInput 
              label={<span className="hidden lg:inline text-[10px]">PASSWORD</span>} 
              placeholder="••••••••" 
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />} 
              className="hidden lg:flex"
            />
            
            {/* Desktop Confirm Password */}
            <div className="hidden lg:block w-full">
               <FormInput 
                 label="CONFIRM" 
                 placeholder="••••••••" 
                 type={showPassword ? 'text' : 'password'}
                 icon={<ShieldCheck className="w-[18px] h-[18px]" />} 
               />
            </div>
          </div>

          <div className="pt-2 flex items-start lg:items-center gap-3 bg-[#f8fafc] lg:bg-transparent p-4 lg:p-0 rounded-xl lg:rounded-none border border-slate-100 lg:border-none">
            <div className="flex items-center lg:h-5">
              <div className="w-[18px] h-[18px] flex items-center justify-center bg-blue-600 rounded-full lg:hidden flex-shrink-0">
                <ShieldCheck className="w-3 h-3 text-white" />
              </div>
              <input 
                id="terms" 
                type="checkbox" 
                className="hidden lg:block w-[18px] h-[18px] text-blue-600 border-slate-300 rounded focus:ring-blue-600 bg-slate-100 cursor-pointer" 
              />
            </div>
            <label htmlFor="terms" className="text-[12px] lg:text-xs text-slate-700 lg:text-slate-600 leading-relaxed cursor-pointer font-medium">
              <span className="hidden lg:inline">I agree to the <a href="#" className="font-semibold text-slate-900 border-b border-transparent hover:border-slate-900 transition-colors">Terms of Service</a> and <a href="#" className="font-semibold text-slate-900 border-b border-transparent hover:border-slate-900 transition-colors">Privacy Policy</a>.</span>
              <span className="inline lg:hidden text-slate-600 text-[11.5px]">By creating an account, you agree to our <a href="#" className="font-bold text-[#0B1E43]">Terms of Strategy</a> and acknowledge our <a href="#" className="font-bold text-[#0B1E43]">Data Privacy Protocol</a>.</span>
            </label>
          </div>

          <div className="pt-3">
            <button 
              type="submit" 
              className="w-full bg-[#03102a] text-white py-[14px] lg:py-3.5 rounded-xl lg:rounded-lg font-semibold tracking-wide transition-all duration-200 hover:bg-[#0a1835] focus:ring-4 focus:ring-blue-900/20 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
            >
              Create Account <ArrowRight className="w-4 h-4 lg:hidden ml-0.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Separator Mobile */}
        <div className="mt-8 mb-6 relative flex items-center lg:hidden">
          <div className="border-t border-slate-200 flex-grow"></div>
          <span className="px-4 text-[10px] uppercase tracking-widest text-slate-400 font-extrabold bg-[#F8FAFC]">Partner Identity</span>
          <div className="border-t border-slate-200 flex-grow"></div>
        </div>

        {/* Social Buttons Mobile */}
        <div className="grid grid-cols-2 gap-4 lg:hidden">
          <button type="button" className="flex items-center justify-center gap-2 bg-white border border-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-shadow">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-[18px] h-[18px]" />
            Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 bg-white border border-slate-100 text-slate-700 py-3.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-shadow">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-[18px] h-[18px] opacity-80" />
            Apple
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-[13px] font-medium">
            <span className="hidden lg:inline">Already have an account? <a href="#" className="font-extrabold text-[#0a152e] hover:underline">Sign in here</a></span>
            <span className="inline lg:hidden">Already part of the ecosystem? <a href="#" className="font-extrabold text-[#0B1E43] hover:underline">Sign In</a></span>
          </p>
        </div>

        {/* Desktop Footer Badges */}
        <div className="absolute bottom-10 left-0 w-full hidden lg:flex justify-start ml-[10%] gap-6 px-0 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">
          <span>Enterprise Ready</span>
          <span>ISO 27001 Certified</span>
          <span>GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;