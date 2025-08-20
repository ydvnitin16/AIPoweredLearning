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
import { useNavigate } from 'react-router-dom'

export default function SubjectPage() {
  const navigate = useNavigate()
    const selectedSubject = UseSelectedSubjectTopic(
        (state) => state.selectedSubject
    );
    const setSelectedTopic = UseSelectedSubjectTopic(
        (state) => state.setSelectedTopic
    );

    const [subject] = useState({
        id: 1,
        title: 'Mathematics',
        color: 'from-indigo-500 to-purple-600',
        progress: 60,
    });

    const [topic, setTopic] = useState([
        { id: 1, title: 'Algebra Basics', done: false },
        { id: 2, title: 'Trigonometry', done: true },
        { id: 3, title: 'Calculus Introduction', done: false },
    ]);

    const {
        data: topics,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['topics', selectedSubject?._id],
        queryFn: () => {
            return selectedSubject && fetch(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/${selectedSubject?._id}/topics`,
                {
                    credentials: 'include',
                }
            )
                .then((res) => res.json())
                .then((data) => data.topics);
        },
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Subject Header */}
            <header
                className={`relative p-10 text-white rounded-b-3xl shadow-lg bg-gradient-to-r ${subject.color}`}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{selectedSubject?.title}</h1>
                        <p className="mt-2 text-sm opacity-90">
                            Progress: {selectedSubject?.progress}%
                        </p>
                        <div className="h-2 w-40 bg-white/30 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full"
                                style={{ width: `${selectedSubject?.progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition flex items-center gap-1">
                            <Sparkles size={16} /> Add Topic (AI)
                        </button>
                        <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition">
                            Revise
                        </button>
                        <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Topics Section */}
            <main className="p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Topics</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {topics?.map((topic) => (
                        <div
                        onClick={() => {
                          setSelectedTopic(topic)
                          navigate('/topic')
                        }}
                            key={topic._id}
                            className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition group relative"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                {topic.done && (
                                    <CheckCircle
                                        size={18}
                                        className="text-green-500"
                                    />
                                )}
                                {topic.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-2">
                                {topic?.status ? 'Completed' : 'In Progress'}
                            </p>

                            {/* Hover Actions */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                <button className="p-1 bg-gray-100 rounded-lg hover:bg-indigo-100">
                                    <Pencil
                                        size={16}
                                        className="text-indigo-600"
                                    />
                                </button>
                                <button className="p-1 bg-gray-100 rounded-lg hover:bg-red-100">
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
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition">
                <Plus size={24} />
            </button>
        </div>
    );
}
