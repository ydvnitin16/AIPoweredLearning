import { useState } from 'react';
import { toggleMarkAsDone } from '../services/apis';
import { useQueryClient } from '@tanstack/react-query';

export function useMarkAsDone() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient()

    const markAsDone = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const resData = await toggleMarkAsDone(data)
            queryClient.invalidateQueries({queryKey: ['subjects']});
            queryClient.invalidateQueries({queryKey: ['topic', resData.progress._id]})
            return resData.progress; // updated progress object
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { markAsDone, loading, error };
}
