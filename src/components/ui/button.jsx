import React from 'react';

export function Button({ children, className = '', variant = 'solid', ...props }) {
  const base = 'inline-block font-medium rounded-full transition-all';
  const variants = {
    solid: 'bg-black text-white hover:opacity-90',
    ghost: 'bg-transparent border border-black/20 hover:bg-black/5 text-black',
  };

  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
