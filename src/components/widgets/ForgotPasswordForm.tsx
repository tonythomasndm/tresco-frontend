import { useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, Lock, EyeOff, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import FormInput from './FormInput';
import { Link } from 'react-router-dom';
import { supabase } from '../../configs/supaClient';
import Loader from '../../pages/Loader/Loader';

const ForgotPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Verify email and old password match
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .eq('password', oldPassword)
        .single();

      if (fetchError || !existingUser) {
        throw new Error('Invalid email or incorrect old password.');
      }

      // Update the password directly
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('email', email);

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setEmail('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        setError(String(err.message));
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center lg:justify-start lg:ml-[10%] py-10 px-6 lg:bg-transparent min-h-[70vh] relative">
      <div className="w-full max-w-[420px] flex flex-col justify-center">

        {/* Mobile Headings */}
        <div className="mb-8 lg:hidden flex flex-col items-center mt-[-20px]">
          <div className="w-14 h-14 bg-[#0B1E43] rounded-xl flex items-center justify-center mb-5 shadow-lg">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-[26px] font-extrabold tracking-tight text-[#0a152e] mb-1 text-center">Reset Password</h2>
          <p className="text-slate-500 text-sm text-center">Enter your email and choose a new password</p>
        </div>

        {/* Desktop Headings */}
        <div className="mb-10 hidden lg:block">
          <h2 className="text-[32px] font-extrabold tracking-tight text-[#0a152e] mb-2 font-sans">Reset Password</h2>
          <p className="text-slate-500 font-medium">Enter your email and set a new secure password.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm text-center">
            <p className="font-semibold mb-1">Password updated successfully!</p>
            <p>You can now <Link to="/login" className="font-bold text-green-800 underline">sign in</Link> with your new password.</p>
          </div>
        )}

        {!success && (
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
              label="OLD PASSWORD"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <FormInput
              label="NEW PASSWORD"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              icon={<Lock className="w-[18px] h-[18px]" />}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none flex items-center justify-center h-full">
                  {showPassword ? <Eye className="w-[18px] h-[18px]" /> : <EyeOff className="w-[18px] h-[18px]" />}
                </button>
              }
            />

            <FormInput
              label="CONFIRM NEW PASSWORD"
              placeholder="••••••••"
              type={showPassword ? 'text' : 'password'}
              icon={<ShieldCheck className="w-[18px] h-[18px]" />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#03102a] text-white py-[14px] lg:py-3.5 rounded-xl lg:rounded-lg font-semibold tracking-wide transition-all duration-200 hover:bg-[#0a1835] focus:ring-4 focus:ring-blue-900/20 shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader showBrand={false} label="Updating password..." size="sm" className="gap-2 py-0 text-white [&_p]:text-white/90" />
                ) : (
                  <>
                    Reset Password <ArrowRight className="w-5 h-5 lg:hidden ml-1 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 lg:mt-10 text-center">
          <p className="text-slate-600 text-[13px] font-medium lg:text-sm">
            Remember your password? <Link to="/login" className="text-[#0a152e] font-extrabold hover:underline ml-1">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
