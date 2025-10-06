import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-6xl font-extrabold text-zinc-900 dark:text-zinc-100">
                404
            </h1>
            <p className="mt-4 text-xl text-zinc-600 dark:text-zinc-400">
                Page not found
            </p>
            <Link
                to="/dashboard"
                className="mt-6 inline-block px-5 py-2 bg-indigo-600 text-white rounded-md"
            >
                Go home
            </Link>
        </div>
    );
}
