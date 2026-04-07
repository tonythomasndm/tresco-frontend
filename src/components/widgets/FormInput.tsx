import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  icon?: ReactNode;
  endIcon?: ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon, endIcon, className = '', ...props }, ref) => {
    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {label}
        </label>
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-[#f3f4f6] rounded-lg border-0 text-slate-800 text-sm py-3.5 transition-all focus:bg-white focus:ring-2 focus:ring-[#0B1E43]/20 focus:outline-none placeholder:text-slate-400
              ${icon ? 'pl-10' : 'pl-4'} 
              ${endIcon ? 'pr-10' : 'pr-4'}
            `}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
              {endIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
