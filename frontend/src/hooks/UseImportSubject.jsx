import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importSubject } from '../services/apis';
import toast from 'react-hot-toast';

export const useImportSubjects = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: importSubject,
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
