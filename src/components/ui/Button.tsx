// Basic Button component for your UI
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-lg transition-all duration-200 flex items-center justify-center font-medium focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-text-500 text-background-100 hover:bg-text-400 focus:ring-text-500 shadow-sm hover:shadow-md',
    secondary: 'bg-info-500 text-background-100 hover:bg-info-400 focus:ring-info-500 shadow-sm hover:shadow-md',
    success: 'bg-success-500 text-background-100 hover:bg-success-400 focus:ring-success-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-text-300 text-text-500 hover:bg-background-300 focus:ring-text-500 hover:border-text-400',
    header: ''
  };
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm sm:text-base',
    lg: 'h-12 px-6 text-base'
  };

  return (
    <button 
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
