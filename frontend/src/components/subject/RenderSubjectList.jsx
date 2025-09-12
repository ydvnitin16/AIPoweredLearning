import React from 'react';
import { useNavigate } from 'react-router';

import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic.jsx';
import { useSubjects } from '../../hooks/UseSubjects.jsx';
import { getColorFromLetter } from '../../services/utils.js';
import CardLoading from '../common/CardLoading.jsx';

const RenderSubjectList = ({ subjectHook, loadingQueue, msg }) => {
    const navigate = useNavigate();
    const setSelectedSubject = UseSelectedSubjectTopic(
        (state) => state.setSelectedSubject
    );

    const { data: subjects, isLoading, isError } = subjectHook();

    if (!subjects?.length && loadingQueue > 0) {
        return <CardLoading msg={msg} />;
    }

    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                        rounded-2xl p-6 shadow-sm hover:shadow-md transition 
                        group relative cursor-wait animate-pulse"
                    >
                        <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded-lg mb-3"></div>
                        <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-zinc-200 dark:bg-zinc-700 rounded-full w-1/2"></div>
                        </div>
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
                    </div>
                ))}
            </div>
        );
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
                </div>
            ))}
            {loadingQueue > 0 && <CardLoading msg={msg} />}
        </div>
    );
};

export default RenderSubjectList;
