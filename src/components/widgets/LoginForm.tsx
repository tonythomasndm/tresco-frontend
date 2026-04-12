import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Lock, EyeOff, Eye, ArrowRight, Loader2 } from 'lucide-react';
import FormInput from './FormInput';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../../configs/supaClient';
import TermsModal from './TermsModal';

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError(null);
    setIsTermsModalOpen(true);
  };

  const handleTermsAccept = async () => {
    setIsTermsModalOpen(false);
    setLoading(true);
    setError(null);

    try {
      // Direct database query against public.users (skipping auth as requested)
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (fetchError || !data) {
        throw new Error('Invalid email or incorrect password.');
      }

      // Save user to localStorage for session
      localStorage.setItem('user', JSON.stringify(data));
      setSuccess(true);
      // Redirect to profile after a brief delay
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('An error occurred during log in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center lg:justify-start lg:ml-[10%] py-10 px-6 lg:bg-transparent min-h-[70vh] relative">
      <div className="w-full max-w-[420px] flex flex-col justify-center">

        {/* Mobile Headings */}
        <div className="mb-8 lg:hidden text-center lg:text-left mt-[-20px]">
          <h2 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-1">Welcome Back</h2>
          <p className="text-sm text-slate-500">Enter your credentials to continue.</p>
        </div>

        {/* Desktop Headings */}
        <div className="hidden mb-10 lg:block">
          <h2 className="text-[32px] font-extrabold tracking-tight text-[#0a152e] mb-2 font-sans">Welcome Back</h2>
          <p className="font-medium text-slate-500">Enter your credentials to access your dashboard.</p>
        </div>
        
        {error && (
          <div className="p-3 mb-4 text-sm text-center text-red-600 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 mb-4 text-sm text-center text-green-700 border border-green-200 rounded-lg bg-green-50">
            Login successful! Welcome back.
          </div>
        )}

        <TermsModal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)} 
          onAccept={handleTermsAccept} 
        />

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
          <FormInput
            label="EMAIL ADDRESS"
            placeholder="name@company.com"
            type="email"
            icon={<Mail className="w-[18px] h-[18px]" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            label={
              <div className="flex justify-between items-center w-[calc(100%+8px)] -mr-2">
                <span className="uppercase text-[10px] tracking-widest text-slate-500">PASSWORD</span>
                <Link to="/forgot-password" className="normal-case text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors tracking-normal">
                  Forgot Password?
                </Link>
              </div>
            }
            placeholder="••••••••"
            type={showPassword ? 'text' : 'password'}
            icon={<Lock className="w-[18px] h-[18px]" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex items-center justify-center h-full focus:outline-none">
                {showPassword ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
              </button>
            }
          />

          <div className="items-center hidden pt-2 lg:flex">
             <input
               id="remember"
               type="checkbox"
               className="w-[16px] h-[16px] text-blue-600 border-slate-300 rounded focus:ring-blue-600 bg-slate-100 cursor-pointer mr-2.5"
             />
            <label htmlFor="remember" className="text-[13px] text-slate-600 cursor-pointer font-medium">
              Keep me logged in for 30 days
            </label>
          </div>

          <div className="pt-3 lg:pt-1">
            <button
               type="submit"
               disabled={loading}
               className="w-full bg-[#03102a] text-white py-[14px] lg:py-3.5 rounded-xl lg:rounded-lg font-semibold tracking-wide transition-all duration-200 hover:bg-[#0a1835] focus:ring-4 focus:ring-blue-900/20 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                   <Loader2 className="w-5 h-5 animate-spin" /> Logging in...
                </>
              ) : (
                <>
                   Log In <ArrowRight className="w-5 h-5 ml-1 transition-transform lg:hidden group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Separator */}
        <div className="relative flex items-center mt-8 mb-6">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-4 text-[11px] lg:text-[12px] text-slate-500 font-semibold bg-transparent">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button type="button" className="flex items-center justify-center gap-2 bg-[#f3f4f6] text-slate-700 py-3 lg:py-2.5 rounded-xl lg:rounded-lg font-bold text-[13px] hover:bg-slate-200 transition-colors shadow-sm lg:shadow-none border border-transparent hover:border-slate-300">
            {/* Using a generic Apple icon on mobile vs Google on desktop per images */}
            <img src="https://th.bing.com/th?q=Google+New+Logo&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.5&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" alt="Google" className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
           
            <span className="hidden lg:inline">Google</span>
          </button>
          <button type="button" className="flex items-center justify-center gap-2 bg-[#f3f4f6] text-slate-700 py-3 lg:py-2.5 rounded-xl lg:rounded-lg font-bold text-[13px] hover:bg-slate-200 transition-colors shadow-sm lg:shadow-none border border-transparent hover:border-slate-300">
          
             <img src="https://th.bing.com/th/id/OIP.fHN7JhG4M9KV4Fpg3i9siAAAAA?w=128&h=108&c=7&qlt=90&bgcl=b726bb&r=0&o=6&dpr=1.5&pid=13.1" alt="Microsoft365" className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
            <span className="hidden lg:inline">Office 365</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center lg:mt-10">
          <p className="text-slate-600 text-[13px] font-medium lg:text-sm">
            <span className="tracking-wide lg:hidden text-slate-500">Don't have an account? <Link to="/signup" className="text-[#0a152e] font-bold hover:underline ml-1 text-sm tracking-normal">Sign Up</Link></span>
            <span className="hidden lg:inline">New to the platform? <Link to="/signup" className="text-[#0a152e] font-extrabold hover:underline ml-1">Create an account</Link></span>
          </p>
        </div>

        {/* Copyright (Desktop Only) */}
        {/* <div className="absolute bottom-8 left-0 w-full hidden lg:flex justify-start ml-[10%] text-[9px] uppercase tracking-[0.1em] text-slate-400 font-bold">
           © 2024 TRESCO, ALL RIGHTS RESERVED.
        </div> */}
      </div>
    </div>
  );
};

export default LoginForm;
