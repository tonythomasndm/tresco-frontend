import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { User, Mail, Lock, EyeOff, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import FormInput from './FormInput';
import { supabase } from '../../configs/supaClient';
import TermsModal from './TermsModal';
import Loader from '../../pages/Loader/Loader';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
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
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([
          { 
            name, 
            email, 
            password, // NOTE: Proceeding with raw password as specifically requested
            role,
          }
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);
      
      // Store user info in localStorage for mock persistence (required by Profile page)
      localStorage.setItem('user', JSON.stringify({ ...data }));

      // Reset form or redirect
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('An error occurred during sign up.');
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
          <h2 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-1">Create Account</h2>
          <p className="text-sm text-slate-500">Start building your trust profile today.</p>
        </div>

        {/* Desktop Headings */}
        <div className="hidden mb-10 lg:block">
          <h2 className="text-[32px] font-extrabold tracking-tight text-[#0a152e] mb-2 font-sans">Begin your journey</h2>
          <p className="font-medium text-slate-500">Build your trust profile in minutes.</p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-center text-red-600 border border-red-200 rounded-lg bg-red-50">
            {error}
          </div>
        )}
        
        {success && (
          <div className="p-3 mb-4 text-sm text-center text-green-700 border border-green-200 rounded-lg bg-green-50">
            Account created successfully! Welcome aboard.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-5">
          
          {/* Role Selection */}
         
          <FormInput 
            label={<span className="lg:hidden text-[9px]">FULL NAME</span>} 
            placeholder="Alexander Pierce" 
            icon={<User className="w-[18px] h-[18px]" />} 
            className="lg:hidden"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput 
            label={<span className="hidden lg:inline text-[10px]">FULL NAME</span>} 
            placeholder="Johnathan Sterling" 
            icon={<User className="w-[18px] h-[18px]" />} 
            className="hidden lg:flex"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <FormInput 
             label={<span className="lg:hidden text-[9px]">EMAIL ADDRESS</span>} 
             placeholder="name@company.com" 
             type="email"
             icon={<Mail className="w-[18px] h-[18px]" />} 
             className="lg:hidden"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput 
             label={<span className="hidden lg:inline text-[10px]">EMAIL ADDRESS</span>} 
             placeholder="name@company.com" 
             type="email"
             icon={<Mail className="w-[18px] h-[18px]" />} 
             className="hidden lg:flex"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
          />
           <div className="flex items-center gap-6 py-1 mb-2 lg:py-2">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="role"
                  value="candidate"
                  checked={role === 'candidate'}
                  onChange={() => setRole('candidate')}
                  className="peer appearance-none w-5 h-5 border-[2px] border-slate-300 rounded-full bg-transparent checked:border-[#0B1E43] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1E43]/20 focus:ring-offset-1"
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0B1E43] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              <span className="text-[13.5px] lg:text-[14px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Candidate</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={role === 'recruiter'}
                  onChange={() => setRole('recruiter')}
                  className="peer appearance-none w-5 h-5 border-[2px] border-slate-300 rounded-full bg-transparent checked:border-[#0B1E43] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B1E43]/20 focus:ring-offset-1"
                />
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0B1E43] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
              <span className="text-[13.5px] lg:text-[14px] font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Recruiter</span>
            </label>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
            <FormInput 
              label={<span className="lg:hidden text-[9px]">PASSWORD</span>} 
              placeholder="••••••••••••" 
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />} 
              endIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                  {showPassword ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
                </button>
              }
              className="lg:hidden"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormInput 
              label={<span className="hidden lg:inline text-[10px]">PASSWORD</span>} 
              placeholder="••••••••" 
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />} 
              className="hidden lg:flex"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Desktop Confirm Password */}
            <div className="hidden w-full lg:block">
               <FormInput 
                 label="CONFIRM" 
                 placeholder="••••••••" 
                 type={showPassword ? 'text' : 'password'}
                 icon={<ShieldCheck className="w-[18px] h-[18px]" />} 
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
               />
            </div>
            {/* Mobile Confirm Password */}
            <div className="w-full lg:hidden">
               <FormInput 
                 label={<span className="text-[9px]">CONFIRM PASSWORD</span>} 
                 placeholder="••••••••••••" 
                 type={showPassword ? 'text' : 'password'}
                 icon={<ShieldCheck className="w-[18px] h-[18px]" />} 
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
               />
            </div>
          </div>
          

        <TermsModal 
          isOpen={isTermsModalOpen} 
          onClose={() => setIsTermsModalOpen(false)} 
          onAccept={handleTermsAccept} 
        />

          <div className="pt-3">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#03102a] text-white py-[14px] lg:py-3.5 rounded-xl lg:rounded-lg font-semibold tracking-wide transition-all duration-200 hover:bg-[#0a1835] focus:ring-4 focus:ring-blue-900/20 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader showBrand={false} label="Creating account..." size="sm" className="gap-2 py-0 text-white [&_p]:text-white/90" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4 lg:hidden ml-0.5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Separator Mobile */}
        <div className="relative flex items-center mt-8 mb-6 lg:hidden">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="px-4 text-[10px] uppercase tracking-widest text-slate-400 font-extrabold bg-[#F8FAFC]">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
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
            <span className="hidden lg:inline">Already have an account? <a href="/login" className="font-extrabold text-[#0a152e] hover:underline">Sign in here</a></span>
            <span className="inline lg:hidden">Already have an account? <a href="/login" className="font-extrabold text-[#0B1E43] hover:underline">Sign In</a></span>
          </p>
        </div>

        {/* Desktop Footer Badges */}
        {/* <div className="absolute bottom-10 left-0 w-full hidden lg:flex justify-start ml-[10%] gap-6 px-0 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold">
          <span>Enterprise Ready</span>
          <span>ISO 27001 Certified</span>
          <span>GDPR Compliant</span>
        </div> */}
      </div>
    </div>
  );
};

export default SignupForm;
