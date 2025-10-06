import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putRequest } from '../services/apis';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const useNotes = () => {
    const queryClient = useQueryClient();
    const setSelectedTopic = UseSelectedSubjectTopic((s) => s.setSelectedTopic);
    // local loading state not necessary because mutation has isLoading; keep for future use if needed
    const [loading, setLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: async ({ topicId, notes }) => {
            const data = await putRequest(
                `${import.meta.env.VITE_SERVER_URL}/topics/notes`,
                { topicId, notes }
            );
            return data;
        },
        onSuccess: (data) => {
            // update selectedTopic in zustand so UI reflects saved notes
            if (data?.topic) {
                setSelectedTopic(data.topic);
            }
            toast.success(data.message || 'Notes saved');
        },
        onError: (err) => {
            toast.error(err.message || 'Failed to save notes');
        },
    });
    return { mutation };
};

export default useNotes;
