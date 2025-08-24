import { useEffect, useState } from 'react';
import {
    Plus,
    Settings,
    CheckCircle,
    Pencil,
    Trash2,
    Sparkles,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom';
import TopicPromptFormModal from '../components/form/TopicPromptFormModal.jsx';

export default function SubjectPage() {
    const [isOpen, setIsOpen] = useState();
    const navigate = useNavigate();
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const setSelectedTopic = UseSelectedSubjectTopic((s) => s.setSelectedTopic);

    const [subject] = useState({
        id: 1,
        title: 'Mathematics',
        color: 'from-indigo-500 to-purple-600',
        progress: 60,
    });

    const { data: topics } = useQuery({
        queryKey: ['topics', selectedSubject?._id],
        queryFn: () =>
            selectedSubject &&
            fetch(
                `${import.meta.env.VITE_SERVER_URL}/${
                    selectedSubject?._id
                }/topics`,
                {
                    credentials: 'include',
                }
            )
                .then((r) => r.json())
                .then((d) => d.topics),
    });

    return (
        <>
            <TopicPromptFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
                {/* Subject Header */}
                <header
                    className={`relative p-8 md:p-10 text-white rounded-b-3xl shadow-lg bg-gradient-to-r ${subject.color}`}
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {selectedSubject?.title}
                            </h1>
                            <p className="mt-2 text-sm/relaxed opacity-90">
                                Progress: {selectedSubject?.progress ?? 0}%
                            </p>
                            <div className="h-2 w-48 bg-white/30 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full"
                                    style={{
                                        width: `${
                                            selectedSubject?.progress ?? 0
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                                className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition flex items-center gap-1"
                            >
                                <Sparkles size={16} /> Add Topic (AI)
                            </button>
                            <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition">
                                Revise
                            </button>
                            <button className="px-3 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition">
                                <Settings size={16} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Topics */}
                <main className="max-w-7xl mx-auto p-6 md:p-8">
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
                                    {topic?.status
                                        ? 'Completed'
                                        : 'In Progress'}
                                </p>

                                {/* Hover Actions */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-zinc-700"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Pencil
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                    </button>
                                    <button
                                        className="p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-red-100 dark:hover:bg-zinc-700"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Trash2
                                            size={16}
                                            className="text-red-600"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Floating Add Button */}
                <button
                    onClick={() => {
                        setIsOpen(true);
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
