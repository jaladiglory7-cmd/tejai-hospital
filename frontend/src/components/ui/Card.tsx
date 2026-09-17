import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: boolean;
}

export function Card({ children, hover = false, padding = true, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl border border-slate-100 shadow-sm ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5' : ''
      } ${padding ? 'p-6 md:p-8' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}