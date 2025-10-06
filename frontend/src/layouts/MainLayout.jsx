import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { UseAuthStore } from '../stores/UseAuthStore';
import toast from 'react-hot-toast';
import Navbar from '../components/common/Navbar';
import UpdateProfileModal from '../components/form/UpdateProfileModal';
import ConfirmModal from '../components/common/ConfirmModal';
import { deleteRequest } from '../services/apis';

const MainLayout = () => {
    const queryClient = useQueryClient();
    const isAuthExpired = UseAuthStore((state) => state.isAuthExpired);
    const clearUserStore = UseAuthStore((state) => state.clearUserStore);
    const userStore = UseAuthStore((state) => state.userStore);
    const navigate = useNavigate();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState();
    useEffect(() => {
        if (isAuthExpired()) {
            toast('Please Login!');
            clearUserStore();
            navigate('/login');
        }
    }, [isAuthExpired, clearUserStore, navigate]);

    const handleLogout = async () => {
        try {
            const data = await deleteRequest(`${import.meta.env.VITE_SERVER_URL}/logout`);
            clearUserStore();
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            navigate('/login');
        } catch (err) {
            toast.error('Failed to logout Sorry!');
        }
    };

    return (
        <>
            <div className="dark:bg-black">
                <UpdateProfileModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                />
                <ConfirmModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                    title={'Confirm Logout'}
                    description={'Do you really want to logout?'}
                />
                <Navbar
                    user={userStore}
                    setIsProfileModalOpen={setIsProfileModalOpen}
                    setIsLogoutModalOpen={setIsLogoutModalOpen}
                />
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
