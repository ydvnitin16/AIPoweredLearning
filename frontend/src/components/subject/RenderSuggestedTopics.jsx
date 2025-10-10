import React, { useState } from 'react';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic';
import SuggestedTopicCard from '../common/SuggestedTopicCard';
import { useTopicForm } from '../../hooks/UseTopicForm';
import { useFormStore } from '../../stores/UseTopicFormStore';
import { Megaphone, RefreshCw, Repeat } from 'lucide-react';
import { useGenerateSuggestions } from '../../hooks/UseGenerateSuggestions';

const RenderSuggestedTopics = ({ setTopicGeneratingQueue, topics }) => {
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const setSelectedSubject = UseSelectedSubjectTopic(
        (s) => s.setSelectedSubject
    );
    const [isGenerating, setIsGenerating] = useState(false);

    if (!selectedSubject?.suggestedTopics?.length > 0) {
        return null;
    }

    const { onSubmit } = useGenerateSuggestions();

    const { formData } = useFormStore();
    const { mutation } = useTopicForm();

    const handleGenerate = async (topic, setisGenerating) => {
        try {
            setTopicGeneratingQueue((prev) => prev + 1);
            await mutation.mutateAsync({
                ...formData,
                topic: topic,
                subject: selectedSubject?.title,
                subjectId: selectedSubject?._id,
            });
        } catch (err) {
            // Handle error silently
        } finally {
            setTopicGeneratingQueue((prev) => prev - 1);
            setisGenerating(false);
        }
    };

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 my-6">
                    <span
                        className="text-md px-4 py-1 
                             bg-indigo-100 dark:bg-indigo-900/60 
                             text-indigo-600 dark:text-indigo-400 
                             rounded-full font-medium mr-3"
                    >
                        AI
                    </span>
                    Suggested Topics
                </h2>
                <button
                    onClick={() => {
                        setIsGenerating(true);
                        onSubmit(
                            {
                                subjectId: selectedSubject?._id,
                                title: selectedSubject?.title,
                                topics: topics,
                            },
                            setIsGenerating
                        );
                    }}
                    className="cursor-pointer"
                >
                    {isGenerating ? 'Generating...' : <RefreshCw />}
                </button>
            </div>
            <p className="mx-auto max-w-5xl px-4 opacity-80 text-xs text-zinc-500 flex items-center gap-2">
                {' '}
                <Megaphone />
                Your form preference is based on your last generated topic.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {selectedSubject?.suggestedTopics?.map((topicName, idx) => (
                    <SuggestedTopicCard
                    key={idx}
                        topicName={topicName}
                        onGenerate={handleGenerate}
                    />
                ))}
            </div>
        </>
    );
};

export default RenderSuggestedTopics;
