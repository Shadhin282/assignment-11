import React, { forwardRef } from 'react';
export const Input = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">
      {label}
    </label>}
    <input ref={ref} className={`
            w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `} {...props} />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>;
});
Input.displayName = 'Input';