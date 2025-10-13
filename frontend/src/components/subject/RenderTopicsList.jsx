import { useNavigate } from 'react-router';
import { CheckCircle, Pencil, Trash2 } from 'lucide-react';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic';
import DynamicLoader from '../../components/common/DynamicLoader';
import { UseAuthStore } from '../../stores/UseAuthStore';

const RenderTopicsList = ({
    topics,
    isLoading,
    isError,
    loadingQueue,
    msg,
    deleteTopic,
}) => {
    const setSelectedTopic = UseSelectedSubjectTopic((s) => s.setSelectedTopic);
    const navigate = useNavigate();

    const selectedSubject = UseSelectedSubjectTopic(
        (state) => state.selectedSubject
    );
    const userStore = UseAuthStore((state) => state.userStore);

    if (isLoading) {
        return <DynamicLoader variant="card" count={6} />;
    }

    if (isError) {
        return (
            <div className="p-4 text-red-600">
                <h2 className="text-lg font-bold mb-2">Topics</h2>
                <p>Failed to load Topics. Please try again.</p>
            </div>
        );
    }

    if (!topics?.length && !loadingQueue) {
        return (
            <div className="col-span-full text-zinc-600 dark:text-zinc-400">
                No Topics yet—click “Add Topic” to create your first one.
            </div>
        );
    }

    return (
        <>
            <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                Topics
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {topics?.map((topic) => (
                    <div
                        key={topic._id}
                        onClick={() => {
                            setSelectedTopic(topic);
                            navigate('/topic');
                        }}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow hover:shadow-lg transition group relative cursor-pointer"
                    >
                        <h3 className="text-base md:text-lg font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                            {topic.done && (
                                <CheckCircle
                                    size={18}
                                    className="text-green-500"
                                />
                            )}
                            {topic.topic}
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                            {topic?.isDone ? 'Completed' : 'In Progress'}
                        </p>

                        {/* Hover Actions */}
                        {userStore.id === selectedSubject?.createdBy && (
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button
                                    className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-zinc-700 cursor-no-drop"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Pencil
                                        size={16}
                                        className="text-indigo-600"
                                    />
                                </button>
                                <button
                                    className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-red-100 dark:hover:bg-zinc-700 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteTopic.mutate(topic._id);
                                    }}
                                >
                                    <Trash2
                                        size={16}
                                        className="text-red-600"
                                    />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
                {loadingQueue > 0 && <DynamicLoader variant="card" msg={msg} />}
            </div>
        </>
    );
};

export default RenderTopicsList;
