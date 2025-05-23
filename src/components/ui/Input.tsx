import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, error, className = '', ...props }) => {
    const baseStyles = 'w-full px-3 py-2 bg-raycast-bgLighter border border-raycast-border rounded-md text-raycast-textPrimary placeholder-raycast-textSecondary focus:outline-none focus:ring-2 focus:ring-raycast-accent focus:border-transparent disabled:opacity-50';
    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : 'border-raycast-border';

    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-raycast-textSecondary mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`${baseStyles} ${errorStyles} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
};

export default Input;