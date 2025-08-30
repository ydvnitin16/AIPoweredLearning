// src/pages/TopicPage.jsx
import React, { useEffect, useState } from 'react';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/topics/quizQuestion.jsx';
import { Menu, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ContentRenderer from '../components/topics/contentRenderer.jsx';
import PracticeQuestionCard from '../components/topics/PracticeQuestionCard.jsx';

export default function TopicPage() {
    const navigate = useNavigate();
    const selectedTopic = UseSelectedSubjectTopic((s) => s.selectedTopic);
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);

    const [notes, setNotes] = useState('');
    const [done, setDone] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );
    const [menuOpen, setMenuOpen] = useState(false);

    // Apply dark mode to <html>
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Close mobile menu on resize >= md
    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // defensive defaults
    const contentArr = selectedTopic?.output?.content || [];
    const flashcards = selectedTopic?.output?.flashcards || [];
    const quizzes = selectedTopic?.output?.quizzes || [];
    const quickRevision = selectedTopic?.output?.quickRevision || null;
    const practiceQuestions = selectedTopic?.output?.practiceQuestions || [];

    // Persist notes locally for demo (replace with API saving)
    useEffect(() => {
        const key = `notes_${selectedTopic?._id ?? 'anon'}`;
        const saved = localStorage.getItem(key);
        if (saved) setNotes(saved);
    }, [selectedTopic?._id]);

    const saveNotes = () => {
        const key = `notes_${selectedTopic?._id ?? 'anon'}`;
        localStorage.setItem(key, notes);
    };

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            {/* Header */}
            <header className="backdrop-blur-sm shadow-md sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        📘 Smart Study AI
                    </h1>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex space-x-6 text-sm">
                        <a href="#" className="hover:text-indigo-500">
                            Dashboard
                        </a>
                        <a href="#" className="hover:text-indigo-500">
                            Subjects
                        </a>
                        <a href="#" className="hover:text-indigo-500">
                            Public Library
                        </a>
                        <a href="#" className="hover:text-indigo-500">
                            Settings
                        </a>
                    </nav>

                    {/* mobile controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDarkMode((v) => !v)}
                            className="hidden md:inline bg-indigo-100 dark:bg-zinc-700 text-indigo-700 dark:text-zinc-100 px-3 py-1 rounded-lg text-sm"
                            aria-pressed={darkMode}
                        >
                            {darkMode ? '🌞 Light' : '🌙 Dark'}
                        </button>

                        <img
                            src="https://i.pravatar.cc/40"
                            alt="user"
                            className="w-9 h-9 rounded-full hidden md:block"
                        />

                        <button
                            className="md:hidden text-zinc-700 dark:text-zinc-200 p-2 rounded-md"
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white dark:bg-zinc-900 px-4 sm:px-6 py-3 border-t border-zinc-200 dark:border-zinc-800">
                        <a
                            href="#"
                            className="block py-2 hover:text-indigo-500"
                        >
                            Dashboard
                        </a>
                        <a
                            href="#"
                            className="block py-2 hover:text-indigo-500"
                        >
                            Subjects
                        </a>
                        <a
                            href="#"
                            className="block py-2 hover:text-indigo-500"
                        >
                            Public Library
                        </a>
                        <a
                            href="#"
                            className="block py-2 hover:text-indigo-500"
                        >
                            Settings
                        </a>
                        <div className="pt-3">
                            <button
                                onClick={() => setDarkMode((v) => !v)}
                                className="w-full bg-indigo-100 dark:bg-zinc-700 text-indigo-700 dark:text-zinc-100 px-3 py-2 rounded-lg"
                            >
                                {darkMode ? '🌞 Light' : '🌙 Dark'}
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 font-medium sm:px-6 py-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                    <span onClick={() => navigate(-2)} className="truncate cursor-pointer">
                        Dashboard
                    </span>
                    <span>→</span>
                    <span
                        onClick={() => navigate(-1)}
                        className="truncate max-w-[40vw] sm:max-w-none cursor-pointer"
                    >
                        {selectedSubject?.title ?? 'Subject'}
                    </span>
                    <span>→</span>
                    <span className="text-zinc-800 dark:text-zinc-300 truncate max-w-[40vw] sm:max-w-none">
                        {selectedTopic?.topic ?? 'Topic'}
                    </span>
                </div>
            </div>

            {/* Main */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-4 sm:gap-6 lg:grid-cols-3 py-4">
                {/* Left / Main column (stacked on small, wide on lg) */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {contentArr.length === 0 && (
                        <section className="bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">
                            <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                No content available for this topic yet.
                            </p>
                        </section>
                    )}

                    {contentArr.map((obj, idx) => {
                        return <ContentRenderer obj={obj} idx={idx} />;
                    })}

                    {/* Quick Revision */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-md">
                        {contentArr && (
                            <h2 className="text-xl sm:text-2xl font-bold mb-2">
                                Quick Revision
                            </h2>
                        )}
                        <div className="prose prose-zinc max-w-none prose-sm sm:prose-base dark:prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {quickRevision ?? ''}
                            </ReactMarkdown>
                        </div>
                    </section>

                    {/* Flashcards */}
                    <section>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">
                            📑 Flashcards
                        </h3>

                        {/* Mobile: horizontal snap; >=sm: grid */}
                        <div className="sm:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-2">
                            {flashcards.map((card, i) => (
                                <div
                                    key={i}
                                    className="min-w-[85%] snap-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5"
                                >
                                    <p className="font-semibold">
                                        Q: {card.question}
                                    </p>
                                    <p className="mt-2 text-indigo-600">
                                        A: {card.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="hidden sm:grid sm:grid-cols-2 gap-4">
                            {flashcards.map((card, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5"
                                >
                                    <p className="font-semibold">
                                        Q: {card.question}
                                    </p>
                                    <p className="mt-2 text-indigo-600">
                                        A: {card.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Quiz */}
                    <section>
                        <h3 className="text-lg sm:text-xl font-semibold mb-3">
                            📝 Quiz
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                            {quizzes.length === 0 && (
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    No quiz available.
                                </p>
                            )}
                            {quizzes.map((q, i) => (
                                <QuizQuestion key={i} q={q} i={i} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg sm:text-xl font-semibold mb-3">
                            Practice Questions
                        </h2>

                        <div className="grid gap-4">
                            {practiceQuestions.map((q, idx) => (
                                <PracticeQuestionCard
                                    key={idx}
                                    index={idx + 1}
                                    question={q.question}
                                    answer={q.answer}
                                />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right sidebar */}
                <aside className="space-y-4 sm:space-y-6">
                    {/* Progress */}
                    <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">📊 Progress</h3>
                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500"
                                style={{
                                    width: `${selectedTopic?.progress ?? 60}%`,
                                }}
                            />
                        </div>
                        <p className="text-sm mt-2">
                            {selectedTopic?.progress ?? 60}% completed
                        </p>
                    </div>

                    {/* Mark as done */}
                    <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">✅ Mark as Done</h3>
                        <button
                            onClick={() => setDone((v) => !v)}
                            className={`px-4 py-2 rounded-lg w-full ${
                                done
                                    ? 'bg-green-500 text-white'
                                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                            }`}
                        >
                            {done ? 'Done ✔' : 'Mark this topic as Done'}
                        </button>
                    </div>

                    {/* Self notes */}
                    <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">📝 Self Notes</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write your own notes..."
                            className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 resize-y min-h-[120px]"
                            rows={5}
                        />
                        <div className="mt-3 flex gap-2">
                            <button
                                onClick={saveNotes}
                                className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                            >
                                Save Notes
                            </button>
                            <button
                                onClick={() => {
                                    setNotes('');
                                    localStorage.removeItem(
                                        `notes_${selectedTopic?._id ?? 'anon'}`
                                    );
                                }}
                                className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
}
