import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/apis';

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
