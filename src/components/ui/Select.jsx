import React, { forwardRef } from 'react';
export const Select = forwardRef(({
  label,
  error,
  options,
  className = '',
  ...props
}, ref) => {
  return <div className="w-full">
    {label && <label className="block text-sm font-medium text-slate-300 mb-1.5">
      {label}
    </label>}
    <div className="relative">
      <select ref={ref} className={`
              w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 appearance-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `} {...props}>
        {options.map(option => <option key={option.value} value={option.value}>
          {option.label}
        </option>)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>;
});
Select.displayName = 'Select';