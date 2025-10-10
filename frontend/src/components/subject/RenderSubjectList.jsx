import React from 'react';
import { useNavigate } from 'react-router';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic.jsx';
import { getColorFromLetter } from '../../services/utils.js';
import DynamicLoader from '../common/DynamicLoader.jsx';
import { Trash2 } from 'lucide-react';
import { UseAuthStore } from '../../stores/UseAuthStore.jsx';

const RenderSubjectList = ({
    subjectHook,
    loadingQueue,
    msg,
    deleteSubject,
}) => {
    const navigate = useNavigate();
    const setSelectedSubject = UseSelectedSubjectTopic(
        (state) => state.setSelectedSubject
    );
    const userStore = UseAuthStore((state) => state.userStore);
    const { data: subjects, isLoading, isError } = subjectHook();

    if (!subjects?.length && loadingQueue > 0) {
        return <DynamicLoader variant="card" msg={msg} count={3} />;
    }

    if (isLoading) {
        return <DynamicLoader variant="card" count={6} />;
    }

    if (isError) {
        return (
            <div className="p-4 text-red-600">
                <h2 className="text-lg font-bold mb-2">Subjects</h2>
                <p>Failed to load subjects. Please try again.</p>
            </div>
        );
    }

    if (!subjects?.length) {
        return (
            <div className="col-span-full text-zinc-600 dark:text-zinc-400">
                No subjects yet—click “Add Subject” to create your first one.
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subjects?.map((subj) => (
                <div
                    key={subj._id}
                    onClick={() => {
                        setSelectedSubject(subj);
                        navigate('/subject');
                    }}
                    className="relative rounded-3xl p-6 shadow-xl hover:shadow-2xl transition
                           group cursor-pointer ring-1 ring-black/0 hover:ring-black/5
                           dark:ring-white/10 dark:hover:ring-white/20"
                    style={{
                        background: getColorFromLetter(subj.title),
                    }}
                >
                    <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-sm">
                        {subj.title}
                    </h3>

                    <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden mb-4">
                        <div
                            className="h-full bg-white rounded-full"
                            style={{
                                width: `${subj.progress}%`,
                            }}
                        />
                    </div>
                    <p className="text-sm text-white/90">
                        Progress: {subj.progress}%
                    </p>
                    {(
                        <button
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100  transition-opacity duration-200 p-1 backdrop-blur-3xl bg-black/50 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-red-100 dark:hover:bg-zinc-700 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteSubject.mutate(subj._id);
                            }}
                        >
                            <Trash2 size={16} className="text-red-600" />
                        </button>
                    )}
                </div>
            ))}
            {loadingQueue > 0 && <DynamicLoader variant="card" msg={msg} count={1} />}
        </div>
    );
};

export default RenderSubjectList;
