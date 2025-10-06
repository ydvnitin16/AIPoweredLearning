import { useState } from 'react';
import { putRequest } from '../services/apis';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'

export function useMarkAsDone() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient()

    const markAsDone = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const resData = await putRequest(`${import.meta.env.VITE_SERVER_URL}/topics/status`, data)
            toast.success(resData.message)
            queryClient.invalidateQueries({queryKey: ['subjects']});
            queryClient.invalidateQueries({queryKey: ['topic', resData.progress._id]})
            return resData.progress; // updated progress object
        } catch (err) {
            toast.error(resData.message)
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { markAsDone, loading, error };
}
