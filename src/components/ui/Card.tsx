import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`bg-raycast-bgLighter p-4 sm:p-6 rounded-xl border border-raycast-border shadow-card ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;