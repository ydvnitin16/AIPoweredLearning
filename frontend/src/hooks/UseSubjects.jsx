import { useQuery } from '@tanstack/react-query';
import { deleteRequest, getRequest } from '../services/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useSubjects = () => {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const data = await getRequest(
                `${import.meta.env.VITE_SERVER_URL}/subjects`
            );
            return data.subjects;
        },
        retry: 2,
        staleTime: 1000 * 60 * 60,
    });
};

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subjectId) => {
            const data = await deleteRequest(`${import.meta.env.VITE_SERVER_URL}/subjects`, {
                subjectId,
            });
            console.log(data)
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['subjects']);
            toast.success(data.message);
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });
};
