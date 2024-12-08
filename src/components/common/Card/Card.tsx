import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'race' | 'news';
}

export const Card = ({ 
  variant = 'race',
  className,
  children,
  ...props 
}: CardProps) => {
  const baseStyles = 'bg-bg-secondary rounded-lg shadow-card transition-all duration-250';
  
  const variantStyles = {
    race: 'p-4',
    news: 'overflow-hidden hover:transform hover:-translate-y-0.5',
  };

  return (
    <div
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}; 