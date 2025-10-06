import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postRequest } from '../services/apis';
import toast from 'react-hot-toast';

export const useImportSubjects = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (subjectId) => {
            const data = await postRequest(`${import.meta.env.VITE_SERVER_URL}/subjects/import`, subjectId);
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['imported-subjects'] });
            toast.success(data.message);
        },
        onError: (data) => {
            toast.error(data.message);
        },
    });

    return { mutation };
};
