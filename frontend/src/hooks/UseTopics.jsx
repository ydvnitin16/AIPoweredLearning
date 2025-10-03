import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteData, fetchData } from '../services/apis';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';
import toast from 'react-hot-toast'

export const useTopics = () => {
    const selectedSubject = UseSelectedSubjectTopic(s => s.selectedSubject)
    return useQuery({
        queryKey: ['topics', selectedSubject?._id],
        enabled: !!selectedSubject?._id,
        queryFn: async () => {
            const data = await fetchData(
                `${import.meta.env.VITE_SERVER_URL}/${
                    selectedSubject?._id
                }/topics`
            );
            return data.topics;
        },
    });
};

export const useDeleteTopic = () => {
    const queryClient = useQueryClient();
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);

    return useMutation({
        mutationFn: async (id) => {
            const data = await deleteData(
                `${import.meta.env.VITE_SERVER_URL}/topics`,
                { id }
            );
            return data;
        },
        onSuccess: (data) => {
            // Refetch topics for this subject
            if (selectedSubject?._id) {
                queryClient.invalidateQueries(['topics', selectedSubject._id]);
            }
            toast.success(data.message || 'Topic deleted successfully');
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to delete topic');
        },
    });
};
