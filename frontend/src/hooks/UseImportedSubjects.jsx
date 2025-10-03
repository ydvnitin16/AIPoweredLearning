import { useQuery } from '@tanstack/react-query';
import { deleteData, fetchData } from '../services/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useImportedSubjects = () => {
    return useQuery({
        queryKey: ['imported-subjects'],
        queryFn: async () => {
            const data = await fetchData(
                `${import.meta.env.VITE_SERVER_URL}/imported-subjects`
            );
            return data.importedSubjects;
        },
        retry: 2,
        staleTime: 1000 * 60 * 60,
    });
};

export const useDeleteImportedSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subjectId) => {
            const data = await deleteData(`${import.meta.env.VITE_SERVER_URL}/imported-subjects`, {
                subjectId,
            });
            return data
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['imported-subjects']);
            toast.success(data.message);
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });
};
