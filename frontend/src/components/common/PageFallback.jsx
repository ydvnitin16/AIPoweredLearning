import React from 'react';
import Loading from './Loading';

export default function PageFallback() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-transparent">
            <div className="mb-4">
                <Loading />
            </div>
        </div>
    );
}
