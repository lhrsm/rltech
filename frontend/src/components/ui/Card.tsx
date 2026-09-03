import React from 'react';
import type { HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'interactive';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const base =
    'rounded-lg border bg-[#0e1015] p-5 transition-all duration-150 ease-out';

  const variants = {
    default: 'border-zinc-800/80 text-zinc-200 shadow-subtle',
    elevated:
      'border-zinc-800 bg-[#12151c] text-zinc-100 shadow-elevated',
    interactive:
      'border-zinc-800/80 hover:border-zinc-700 bg-[#0e1015] hover:bg-[#13161f] text-zinc-200 cursor-pointer shadow-subtle',
  };

  return (
    <div className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {children}
    </div>
  );
};
