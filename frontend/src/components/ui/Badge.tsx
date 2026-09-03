import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'slate' | 'amber';
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  dot = true,
  className,
  size = 'md',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
  };

  const dotColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-600',
    slate: 'bg-slate-500',
    amber: 'bg-amber-500',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-medium tracking-normal',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 border rounded-full font-medium transition-colors select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full inline-block shrink-0',
            dotColors[variant],
            variant === 'emerald' && 'animate-pulse'
          )}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
