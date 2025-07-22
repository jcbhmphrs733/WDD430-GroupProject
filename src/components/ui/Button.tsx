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
    primary: 'bg-primary-500 text-cream hover:bg-primary-600 focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-info-500 text-cream hover:bg-info-600 focus:ring-info-500 shadow-sm hover:shadow-md',
    success: 'bg-success-500 text-cream hover:bg-success-600 focus:ring-success-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-dark-300 dark:border-cream text-dark-700 dark:text-cream hover:bg-dark-50 dark:hover:bg-dark-800 focus:ring-dark-500'
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
