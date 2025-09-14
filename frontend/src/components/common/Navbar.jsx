import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getColorFromLetter } from '../../services/utils';

const Navbar = ({ user, setIsProfileModalOpen, setIsLogoutModalOpen }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        
        <header
            className="flex justify-between items-center px-6 md:px-8 py-4 sticky top-0 z-50
            bg-white/90 dark:bg-zinc-950 backdrop-blur border-b border-zinc-200 dark:border-zinc-800"
        >
            {/* App Name and Logo */}
            <div
                className="flex items-center gap-4 text-[#0d141c] dark:text-white cursor-pointer"
                onClick={() => navigate('/dashboard')}
            >
                <div className="size-6">
                    <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-tight">
                    Smart Study AI
                </h1>
            </div>

            {/* Profile Section */}
            {user?.id ? <div className="relative">
                <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full dark:bg-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition cursor-pointer
                        dark:text-white text-sm font-semibold"
                >
                    <div className="size-8 rounded-full bg-gray-500 flex items-center justify-center text-white"
                    style={{backgroundColor: getColorFromLetter(user?.name)}}>
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span>{user?.name.split(' ')[0]|| 'User'}</span> 
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg shadow-lg overflow-hidden z-50">
                        <button
                            onClick={() => {
                                setIsProfileOpen(false);
                                setIsProfileModalOpen(true)
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-sm cursor-pointer"
                        >
                            Update Profile
                        </button>
                        <button
                            onClick={() => {
                                setIsProfileOpen(false);
                                setIsLogoutModalOpen(true)
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-sm text-red-600 cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div> : <button
                    onClick={() => navigate('/get-started')}
                    className="min-w-[100px] h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                    Get Started
                </button>}
        </header>
    );
};

export default Navbar;
