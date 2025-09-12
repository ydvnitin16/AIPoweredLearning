import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/apis';

export const useSubjects = () => {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const data = await fetchData(
                `${import.meta.env.VITE_SERVER_URL}/subjects`
            );
            return data.subjects;
        },
        retry: 2,
        staleTime: 1000 * 60 * 60,
    });
};
