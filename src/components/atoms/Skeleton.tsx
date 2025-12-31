import React from 'react';

/**
 * Simple skeleton loader component. Use the `className` prop to adjust size.
 * Example: <Skeleton className="h-8 w-32" />
 */
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
    <div
        className={`animate-pulse rounded bg-muted ${className}`}
        aria-hidden="true"
    />
);
