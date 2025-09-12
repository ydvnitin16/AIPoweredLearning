import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';
import toast from 'react-hot-toast';
import { generateTopic } from '../services/apis';
import { useFormStore } from '../stores/UseTopicFormStore';

const schema = yup.object({
    topic: yup
        .string()
        .min(2, 'Topic name must be at least 2 characters')
        .required('Topic is required'),
    prompt: yup.string().notRequired(),
    flashcardsEnabled: yup.boolean().default(false),
    flashcardsCount: yup
        .number()
        .typeError('Flashcards count must be a number')
        .min(1, 'At least 1 flashcard required')
        .max(50, 'Max 50 flashcards')
        .notRequired(),

    quizzesEnabled: yup.boolean().default(false),
    quizzesCount: yup
        .number()
        .typeError('Quizzes count must be a number')
        .min(1, 'At least 1 quiz required')
        .max(20, 'Max 20 quizzes')
        .notRequired(),
    practiceEnabled: yup.boolean().default(false),
    practiceDifficulty: yup
        .mixed()
        .oneOf(['easy', 'medium', 'hard'])
        .notRequired(),
    practiceCount: yup
        .number()
        .typeError('Practice count must be a number')
        .min(1, 'At least 1 question required')
        .max(50, 'Max 50 questions')
        .notRequired(),
});

export const useTopicForm = () => {
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const { formData } = useFormStore();
    const form = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            topic: formData.topic || '',
            prompt: formData.prompt || '',
            flashcardsEnabled: formData.flashcards?.enabled || false,
            flashcardsCount: formData.flashcards?.count || 3,
            quizzesEnabled: formData.quizzes?.enabled || false,
            quizzesCount: formData.quizzes?.count || 5,
            practiceEnabled: formData.practiceQuestions?.enabled || false,
            practiceDifficulty:
                formData.practiceQuestions?.difficulty || 'easy',
            practiceCount: formData.practiceQuestions?.count || 5,
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: generateTopic,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['topics', selectedSubject?._id],
            });
            queryClient.invalidateQueries({
                queryKey: ['subjects'],
            });
            toast.success(data.message);
        },
        onError: (data) => {
            toast.error(data.message);
        },
    });
    return { form, mutation };
};
