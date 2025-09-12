import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/apis';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';

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
