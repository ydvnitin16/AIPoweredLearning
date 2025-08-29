import { useEffect, useState } from 'react';
import { Plus, Users, BookOpen, Compass } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getColorFromLetter } from '../services/utils.js';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom';
import SubjectFormModal from '../components/form/SubjectFormModal.jsx';
import UpdateProfileModal from '../components/form/UpdateProfileModal.jsx';

export default function Dashboard() {
    const [isOpen, setIsOpen] = useState();
    const [isProfileOpen, setIsProfileOpen] = useState();
    const setSelectedSubject = UseSelectedSubjectTopic(
        (state) => state.setSelectedSubject
    );
    const navigate = useNavigate();

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

    const { data: mySubjects } = useQuery({
        queryKey: ['subjects'],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_SERVER_URL}/my-subjects`, {
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((data) => data.mySubjects),
    });

    useEffect(() => {
        console.log(mySubjects);
    }, [mySubjects]);

    return (
        <>
            <SubjectFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <UpdateProfileModal isProfileOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
                {/* Top Navigation */}
                <header
                    className="flex justify-between items-center px-6 md:px-8 py-4 sticky top-0 z-50
                         bg-white/90 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800"
                >
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Smart Study AI
                    </h1>
                    <nav className="hidden md:flex gap-6 md:gap-8 text-zinc-700 dark:text-zinc-300 font-medium">
                        <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                            My Subjects
                        </button>
                        <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                            Public Subjects
                        </button>
                        <button 
                        onClick={() => {setIsProfileOpen(true)
                        }} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                            Profile
                        </button>
                    </nav>
                    <button
                        className="flex items-center gap-2 px-3 py-2 rounded-xl
                     bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition md:hidden"
                    >
                        <Plus size={18} /> New
                    </button>
                </header>

                <main className="p-6 md:p-8 max-w-7xl mx-auto">
                    {/* My Subjects Section */}
                    <section className="mb-12">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <BookOpen size={20} /> My Subjects
                            </h2>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-indigo-600 text-white hover:bg-indigo-700
                               dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow"
                            >
                                <Plus size={18} /> Add Subject
                            </button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {mySubjects?.map((subj) => (
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
                                        background: getColorFromLetter(
                                            subj.title
                                        ),
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

                            {/* Empty state (optional) */}
                            {!mySubjects?.length && (
                                <div className="col-span-full text-zinc-600 dark:text-zinc-400">
                                    No subjects yet—click “Add Subject” to
                                    create your first one.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Public Subjects Section */}
                    <section>
                        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                            <Compass size={20} /> Explore Public Subjects
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {publicSubjects.map((subj) => (
                                <div
                                    key={subj.id}
                                    className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${subj.color} text-white
                            hover:scale-[1.02] hover:shadow-2xl transition cursor-pointer
                            ring-1 ring-white/10 hover:ring-white/20`}
                                >
                                    <h3 className="text-lg font-semibold">
                                        {subj.title}
                                    </h3>
                                    <p className="text-sm mt-2 opacity-95 flex items-center gap-1">
                                        <Users size={14} /> by {subj.creator}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Floating Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition
                   bg-indigo-600 text-white hover:bg-indigo-700
                   dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    aria-label="Add Subject"
                >
                    <Plus size={24} />
                </button>
            </div>
        </>
    );
}
