import React from 'react';

function CardSkeleton({ msg }) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm pointer-events-none animate-pulse">
            <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-3" />
            <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-1" />
            {msg && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 italic">
                    {msg}
                </p>
            )}
        </div>
    );
}

function BlockSkeleton() {
    return (
        <div className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md animate-pulse">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3 mb-3" />
            <div className="space-y-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
            </div>
        </div>
    );
}

function ListSkeleton({ count = 3 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="h-10 w-10 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="flex-1">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mb-2" />
                        <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function DynamicLoader({ variant = 'card', count, msg }) {
    if (variant === 'block') {
        return (
            <div className="space-y-4">
                {Array.from({ length: count }).map((_, i) => (
                    <BlockSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (variant === 'list') {
        return <ListSkeleton count={count} />;
    }

    if (variant === 'card' && !count) {
        return (
            <div className="w-full">
                <CardSkeleton msg={msg} />
            </div>
        );
    }

    // default: card
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} msg={msg} />
            ))}
        </div>
    );
}
