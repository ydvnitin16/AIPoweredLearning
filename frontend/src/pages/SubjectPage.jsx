import { useEffect, useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { useDeleteTopic, useTopics } from '../hooks/UseTopics.jsx';
import SubjectHeader from '../components/subject/SubjectHeader.jsx';
import RenderTopicsList from '../components/subject/RenderTopicsList.jsx';
import RenderSuggestedTopics from '../components/subject/RenderSuggestedTopics.jsx';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import Loading from '../components/common/Loading.jsx';

// Lazy load modal component
const TopicPromptFormModal = lazy(() =>
    import('../components/form/TopicPromptFormModal.jsx')
);

export default function SubjectPage() {
    const [isTopicPromptModalOpen, setIsTopicPromptModalOpen] = useState();
    const [topicGeneratingQueue, setTopicGeneratingQueue] = useState(0);
    const { data: topics, isLoading, isError } = useTopics();

    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const setSelectedSubjects_Topics = UseSelectedSubjectTopic(
        (s) => s.setSelectedSubjects_Topics
    );

    const deleteTopic = useDeleteTopic();

    useEffect(() => {
        setSelectedSubjects_Topics(selectedSubject?._id, topics);
    }, [topics, selectedSubject?._id, setSelectedSubjects_Topics]);

    return (
        <>
            <Suspense >
                <TopicPromptFormModal
                    setTopicGeneratingQueue={setTopicGeneratingQueue}
                    isOpen={isTopicPromptModalOpen}
                    onClose={() => setIsTopicPromptModalOpen(false)}
                />
            </Suspense>
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
                {/* Subject Header */}
                <SubjectHeader
                    setIsTopicPromptModalOpen={setIsTopicPromptModalOpen}
                />

                {/* Topics */}
                <main className="max-w-7xl mx-auto p-6 md:p-8">
                    <RenderTopicsList
                        topics={topics}
                        isLoading={isLoading}
                        isError={isError}
                        loadingQueue={topicGeneratingQueue}
                        msg={`Topic Generating ${topicGeneratingQueue} in queue`}
                        deleteTopic={deleteTopic}
                    />

                    <RenderSuggestedTopics
                        setTopicGeneratingQueue={setTopicGeneratingQueue}
                        topics={topics}
                    />
                </main>

                {/* Floating Add Button */}
                <button
                    onClick={() => {
                        setIsTopicPromptModalOpen(true);
                    }}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition
                   bg-indigo-600 text-white hover:bg-indigo-700
                   dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    aria-label="Add Topic"
                >
                    <Plus size={24} />
                </button>
            </div>
        </>
    );
}
