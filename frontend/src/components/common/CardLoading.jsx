import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';

const CardLoading = ({ msg }) => {
    return (
        <div
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                        rounded-2xl p-6 shadow-sm hover:shadow-md transition 
                        group relative cursor-wait animate-pulse"
        >
            {/* Title Skeleton */}
            <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-3"></div>

            {/* Subtitle Skeleton */}
            <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-1"></div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 italic">
                {msg}
            </p>

            {/* Hover Actions (disabled look while loading) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-60">
                <button
                    className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                               rounded-lg cursor-not-allowed"
                    disabled
                >
                    <Pencil size={16} className="text-zinc-400" />
                </button>
                <button
                    className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 
                               rounded-lg cursor-not-allowed"
                    disabled
                >
                    <Trash2 size={16} className="text-zinc-400" />
                </button>
            </div>
        </div>
    );
};

export default CardLoading;
