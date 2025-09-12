import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSubject } from '../services/apis';
import toast from 'react-hot-toast';

const schema = yup.object({
    title: yup
        .string()
        .min(2, 'Subject title must be at least 2 characters')
        .required('Title is required'),
});

export const useSubjectForm = () => {
    const queryClient = useQueryClient();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subjectTitle: '',
        },
    });

    const mutation = useMutation({
        mutationFn: createSubject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            toast.success(data.message)
        },
        onError: (data) => {
            toast.error(data.message)
        }
    });

    return { form, mutation };
};
