import React from 'react';

// Loading fallback used inside Suspense. By default it renders an inline
// non-blocking spinner so pages don't get a full gray overlay. To keep the
// previous behavior you can pass `fullscreen={true}`.
const Loading = ({ fullscreen = true }) => {
    const dots = (
        <div className="flex flex-row gap-2 items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-green-400 animate-bounce" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '-0.2s' }} />
            <div className="w-3.5 h-3.5 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '-0.4s' }} />
        </div>
    );

    if (fullscreen) {
        return (
            <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-[1000]">
                {dots}
            </div>
        );
    }

    // Inline non-blocking spinner — places a small spinner where the fallback is used
    return (
        <div className="flex justify-center items-center p-3">
            {dots}
        </div>
    );
};

export default Loading;
