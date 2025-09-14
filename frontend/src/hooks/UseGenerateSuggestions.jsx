import { useQueryClient } from '@tanstack/react-query';
import { generateSuggestions } from '../services/apis';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';
import toast from 'react-hot-toast';

export const useGenerateSuggestions = () => {
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const setSelectedSubject = UseSelectedSubjectTopic(
        (s) => s.setSelectedSubject
    );
    const queryClient = useQueryClient();
    const onSubmit = async (subjectInfo, setIsGenerating) => {
        try {
            let { topics, subjectId, title } = subjectInfo;
            topics = topics.map((t) => t.topic);
            const data = await generateSuggestions({
                topics,
                subjectId,
                title,
            });
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            if (selectedSubject?._id === data.subject._id) {
                setSelectedSubject(data.subject);
            }
            setIsGenerating(false);
            toast.success(data.message);
        } catch (err) {
            console.log(err);
        }
    };

    return { onSubmit };
};
