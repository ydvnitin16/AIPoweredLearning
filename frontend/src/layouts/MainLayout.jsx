import { useEffect, useState, Suspense, lazy } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { UseAuthStore } from '../stores/UseAuthStore';
import toast from 'react-hot-toast';
import Navbar from '../components/common/Navbar';
import Loading from '../components/common/Loading';
import { deleteRequest } from '../services/apis';

// Lazy load modal components
const UpdateProfileModal = lazy(() =>
    import('../components/form/UpdateProfileModal')
);
const ConfirmModal = lazy(() => import('../components/common/ConfirmModal'));

const MainLayout = () => {
    const queryClient = useQueryClient();
    const isAuthExpired = UseAuthStore((state) => state.isAuthExpired);
    const clearUserStore = UseAuthStore((state) => state.clearUserStore);
    const userStore = UseAuthStore((state) => state.userStore);
    const navigate = useNavigate();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState();
    useEffect(() => {
        if (isAuthExpired() && userStore) {
            toast('Please Login!');
            clearUserStore();
            navigate('/login');
        }
    }, [isAuthExpired, clearUserStore, navigate]);

    const handleLogout = async () => {
        try {
            const data = await deleteRequest(
                `${import.meta.env.VITE_SERVER_URL}/logout`
            );
            clearUserStore();
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            navigate('/login');
        } catch (err) {
            toast.error('Failed to logout Sorry!');
        }
    };

    useEffect(() => {
        const bootServer = async () => {
            try {
                toast('Starting backend...');
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/subjects`
                );
                toast.success('Backend started successfully.');
            } catch (error) {
                toast.error('Backend boot failed.');
            }
        };

        bootServer();
    }, []);

    return (
        <>
            <div className="dark:bg-black overflow-hidden">
                <Suspense >
                    <UpdateProfileModal
                        isOpen={isProfileModalOpen}
                        onClose={() => setIsProfileModalOpen(false)}
                    />
                </Suspense>
                <Suspense >
                    <ConfirmModal
                        isOpen={isLogoutModalOpen}
                        onClose={() => setIsLogoutModalOpen(false)}
                        onConfirm={handleLogout}
                        title={'Confirm Logout'}
                        description={'Do you really want to logout?'}
                    />
                </Suspense>
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
