import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../services/apis';

export const usePublicSubjects = () => {
    return useQuery({
        queryKey: ['public-subjects'],
        queryFn: async () => {
            const data = await getRequest(
                `${import.meta.env.VITE_SERVER_URL}/public-subjects`
            );
            return data.publicSubjects;
        },
        retry: 2,
        staleTime: 1000 * 60 * 5,
    });
};
