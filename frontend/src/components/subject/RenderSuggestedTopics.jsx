import React from 'react';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic';
import SuggestedTopicCard from '../common/SuggestedTopicCard';
import { useTopicForm } from '../../hooks/UseTopicForm';
import { useFormStore } from '../../stores/UseTopicFormStore';

const RenderSuggestedTopics = ({ setTopicGeneratingQueue }) => {
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);

    if (!selectedSubject?.suggestedTopics?.length > 0) {
        return null;
    }

    const { formData } = useFormStore();
    const { mutation } = useTopicForm();

    const onSubmit = async (topic) => {
        try {
            setTopicGeneratingQueue((prev) => prev + 1);
            await mutation.mutateAsync({
                ...formData,
                topic: topic,
                subject: selectedSubject?.title,
                subjectId: selectedSubject?._id,
            });
        } catch (err) {
            console.log(err);
        } finally {
            setTopicGeneratingQueue((prev) => prev - 1);
        }
    };

    return (
        <>
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

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {selectedSubject?.suggestedTopics?.map((topicName) => (
                    <SuggestedTopicCard topicName={topicName} onGenerate={onSubmit} />
                ))}
            </div>
        </>
    );
};

export default RenderSuggestedTopics;
