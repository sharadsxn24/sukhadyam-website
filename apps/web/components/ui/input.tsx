import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  prefix?: string;
  suffix?: string;
  quickButtons?: { label: string; value: string; onClick: () => void }[];
  error?: string;
}

export function Input({
  label,
  prefix,
  suffix,
  quickButtons,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {prefix}
          </span>
        )}
        <input
          {...props}
          className={`w-full ${prefix ? 'pl-10' : 'pl-4'} ${suffix ? 'pr-12' : 'pr-4'} py-3 border-2 ${
            error ? 'border-red-300' : 'border-gray-200'
          } rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg font-medium ${className}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
            {suffix}
          </span>
        )}
      </div>
      {quickButtons && quickButtons.length > 0 && (
        <div className="flex gap-2 mt-2">
          {quickButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.onClick}
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

