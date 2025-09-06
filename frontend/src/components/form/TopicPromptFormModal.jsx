import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFormStore } from '../../stores/UseTopicFormStore.jsx';
import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic.jsx';

// ---------------- Schema Validation ----------------
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

export default function TopicPromptFormModal({
    isOpen,
    onClose,
    setIsGenerating,
}) {
    console.log('Modal Opened');
    const { setFormData } = useFormStore();
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            topicName: '',
            prompt: '',
            flashcardsEnabled: false,
            flashcardsCount: 3,
            quizzesEnabled: false,
            quizzesCount: 5,
            practiceEnabled: false,
            practiceDifficulty: 'medium',
            practiceCount: 5,
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => {
            setIsGenerating(true);
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/topics`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['topics', selectedSubject?._id],
            });
            queryClient.invalidateQueries({
                queryKey: ['subjects'],
            });
        },
    });

    const flashcardsEnabled = watch('flashcardsEnabled');
    const quizzesEnabled = watch('quizzesEnabled');
    const practiceEnabled = watch('practiceEnabled');

    const onSubmit = async (data) => {
        onClose();
        const formatted = {
            topic: data.topic,
            prompt: data.prompt,
            flashcards: {
                enabled: data.flashcardsEnabled,
                count: Number(data.flashcardsCount),
            },
            quizzes: {
                enabled: data.quizzesEnabled,
                count: Number(data.quizzesCount),
            },
            practiceQuestions: {
                enabled: data.practiceEnabled,
                difficulty: data.practiceDifficulty,
                count: Number(data.practiceCount),
            },
        };
        console.log(selectedSubject);
        const res = await mutation.mutateAsync({
            topic: data.topic,
            subject: selectedSubject.title,
            prompt: data.prompt,
            flashcards: {
                enabled: data.flashcardsEnabled,
                count: Number(data.flashcardsCount),
            },
            quizzes: {
                enabled: data.quizzesEnabled,
                count: Number(data.quizzesCount),
            },
            practiceQuestions: {
                enabled: data.practiceEnabled,
                difficulty: data.practiceDifficulty,
                count: Number(data.practiceCount),
            },
            subjectId: selectedSubject?._id,
        });
        console.log(res);
        const resData = await res.json();
        setIsGenerating(false);
        console.log(resData);
        setFormData(formatted);
        // close modal after submit
    };

    if (!isOpen) return null; // modal closed

    return (
        <div
            onClick={() => onclose()}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-lg relative">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    Generate Topic Content
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Topic Name */}
                    <FormInput
                        label="Topic Name"
                        type="text"
                        name="topic"
                        placeholder="Enter topic name..."
                        register={register}
                        errors={errors}
                    />

                    {/* Prompt */}
                    <div>
                        <label className="block font-semibold mb-1 dark:text-white">
                            Custom Prompt
                        </label>
                        <textarea
                            {...register('prompt')}
                            className="w-full border rounded-lg px-3 py-2 dark:text-white"
                            rows="3"
                            placeholder="Give extra context or instructions..."
                        />
                        {errors.prompt && (
                            <p className="text-red-500 text-sm">
                                {errors.prompt.message}
                            </p>
                        )}
                    </div>

                    {/* Flashcards */}
                    <div>
                        <label className="flex items-center gap-2 font-semibold dark:text-white cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('flashcardsEnabled')}
                            />
                            Generate Flashcards
                        </label>
                        {flashcardsEnabled && (
                            <FormInput
                                label="Flashcards Count"
                                type="number"
                                name="flashcardsCount"
                                placeholder="3"
                                register={register}
                                errors={errors}
                            />
                        )}
                    </div>

                    {/* Quizzes */}
                    <div>
                        <label className="flex items-center gap-2 font-semibold dark:text-white cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('quizzesEnabled')}
                            />
                            Generate Quizzes
                        </label>
                        {quizzesEnabled && (
                            <FormInput
                                label="Quizzes Count"
                                type="number"
                                name="quizzesCount"
                                placeholder="5"
                                register={register}
                                errors={errors}
                            />
                        )}
                    </div>

                    {/* Practice Questions */}
                    <div>
                        <label className="flex items-center gap-2 font-semibold dark:text-white cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('practiceEnabled')}
                            />
                            Practice Questions
                        </label>

                        {practiceEnabled && (
                            <div className="mt-2 space-y-2 pl-6">
                                <select
                                    {...register('practiceDifficulty')}
                                    className="border rounded px-2 py-1 dark:text-white cursor-pointer"
                                >
                                    <option
                                        className="dark:bg-black"
                                        value="easy"
                                    >
                                        Easy
                                    </option>
                                    <option
                                        className="dark:bg-black"
                                        value="medium"
                                    >
                                        Medium
                                    </option>
                                    <option
                                        className="dark:bg-black"
                                        value="hard"
                                    >
                                        Hard
                                    </option>
                                </select>

                                <FormInput
                                    label="Practice Count"
                                    type="number"
                                    name="practiceCount"
                                    placeholder="5"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        name="Generate Content"
                        bgColor="#2563eb"
                        color="white"
                        borderRadius="8px"
                        height="45px"
                    />
                </form>
            </div>
        </div>
    );
}
