import { useFormStore } from '../../stores/UseTopicFormStore.jsx';
import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic.jsx';
import { useTopicForm } from '../../hooks/UseTopicForm.jsx';
import { Megaphone } from 'lucide-react';


export default function TopicPromptFormModal({
    isOpen,
    onClose,
    setTopicGeneratingQueue,
}) {
    const { form, mutation } = useTopicForm();

    const { setFormData } = useFormStore();
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = form;

    const flashcardsEnabled = watch('flashcardsEnabled');
    const quizzesEnabled = watch('quizzesEnabled');
    const practiceEnabled = watch('practiceEnabled');

    const onSubmit = async (data) => {
        const formatted = {
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
        try {
            onClose();
            setTopicGeneratingQueue((prev) => prev + 1);
            await mutation.mutateAsync({...formatted, topic: data.topic, subject: selectedSubject?.title, subjectId: selectedSubject?._id});
            setFormData(formatted);
        } catch (err) {
            // Handle error silently
        } finally {
            setTopicGeneratingQueue((prev) => prev - 1);
            
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onclose}
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
                    <p className="mx-auto max-w-5xl px-4 pb-8 opacity-80 text-xs text-zinc-500 flex items-center gap-2">
                 <Megaphone /> This setting will be applied to your next topic generations.
            </p>
                </form>
            </div>
        </div>
    );
}
