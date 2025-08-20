import { useEffect, useState } from 'react';
import { Plus, Users, BookOpen, Compass } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getColorFromLetter } from '../services/utils.js';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
    const setSelectedSubject = UseSelectedSubjectTopic(state => state.setSelectedSubject);
    const navigate = useNavigate()
    const [publicSubjects, setPublicSubjects] = useState([
        {
            id: 4,
            title: 'Astronomy Basics',
            color: 'from-sky-400 to-blue-500',
            creator: 'Alice',
        },
        {
            id: 5,
            title: 'Modern Economics',
            color: 'from-amber-400 to-orange-500',
            creator: 'John',
        },
        {
            id: 6,
            title: 'Art History',
            color: 'from-fuchsia-400 to-pink-500',
            creator: 'Sophia',
        },
    ]);

    const {
        data: mySubjects,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_SERVER_URL}/my-subjects`, {
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((data) => data.mySubjects);
        },
    });

    useEffect(() => {
        console.log(mySubjects);
    }, [mySubjects]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Top Navigation */}
            <header className="flex justify-between items-center px-8 py-4 shadow bg-white sticky top-0 z-50">
                <h1 className="text-2xl font-bold text-indigo-600">
                    AI Learning Hub
                </h1>
                <nav className="flex gap-8 text-gray-700 font-medium">
                    <button className="hover:text-indigo-600 transition">
                        My Subjects
                    </button>
                    <button className="hover:text-indigo-600 transition">
                        Public Subjects
                    </button>
                    <button className="hover:text-indigo-600 transition">
                        Profile
                    </button>
                </nav>
            </header>

            <main className="p-8">
                {/* My Subjects Section */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={20} /> My Subjects
                        </h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition">
                            <Plus size={18} /> Add Subject
                        </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mySubjects?.map((subj) => (
                            <div
                            onClick={() => {
                                setSelectedSubject(subj)
                                navigate('/subject')
                            }}
                                key={subj._id}
                                className={`relative rounded-3xl p-6 shadow-xl text-white group hover:scale-[1.02] hover:shadow-2xl transition cursor-pointer`}
                                style={{
                                    background: getColorFromLetter(subj.title),
                                }}
                            >
                                <h3 className="text-2xl font-bold mb-4">
                                    {subj.title}
                                </h3>
                                {/* Progress Bar */}
                                <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden mb-4">
                                    <div
                                        className="h-full bg-white rounded-full"
                                        style={{ width: `${subj.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm opacity-80">
                                    Progress: {subj.progress}%
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Public Subjects Section */}
                <section>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Compass size={20} /> Explore Public Subjects
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {publicSubjects.map((subj) => (
                            <div
                                key={subj.id}
                                className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${subj.color} text-white hover:scale-[1.02] hover:shadow-2xl transition cursor-pointer`}
                            >
                                <h3 className="text-lg font-semibold">
                                    {subj.title}
                                </h3>
                                <p className="text-sm mt-2 opacity-90 flex items-center gap-1">
                                    <Users size={14} /> by {subj.creator}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Floating Button */}
            <button className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition">
                <Plus size={24} />
            </button>
        </div>
    );
}
