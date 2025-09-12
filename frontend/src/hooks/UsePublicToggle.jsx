import { useState } from 'react';
import toast from 'react-hot-toast';
import { publicToggle } from '../services/apis';
import { useQueryClient } from '@tanstack/react-query';

export const usePublicToggle = () => {
    const queryClient = useQueryClient();
    const [isPublic, setIsPublic] = useState(false);

    const handlePublicToggle = async (e, id) => {
        setIsPublic(e.target.checked);
        const formatted = {
            isPublic: e.target.checked,
            subjectId: id,
        };
        try {
            const data = await publicToggle(formatted);
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            toast.success(data.message);
        } catch (err) {
            toast.error(data.message);
        }
    };
    return { handlePublicToggle, isPublic };
};
