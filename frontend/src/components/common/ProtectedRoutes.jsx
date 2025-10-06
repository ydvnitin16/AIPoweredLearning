import toast from 'react-hot-toast';
import { UseAuthStore } from '../../stores/UseAuthStore';
import { Navigate } from 'react-router';

const ProtectedUserRoutes = ({ children }) => {
    const userStore = UseAuthStore((state) => state.userStore);
    if (!userStore) {
        toast.error('Access Denied');
        return <Navigate to="/" />;
    }
    return children;
};

export { ProtectedUserRoutes };
