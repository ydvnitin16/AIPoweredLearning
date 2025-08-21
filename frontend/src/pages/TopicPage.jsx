import React, { useEffect, useState } from 'react';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom';
import QuizQuestion from '../components/topics/quizQuestion.jsx';
import { Menu, X } from 'lucide-react'; // for hamburger menu icons

export default function TopicPage() {
    const navigate = useNavigate();
    const selectedTopic = UseSelectedSubjectTopic(
        (state) => state.selectedTopic
    );
    const selectedSubject = UseSelectedSubjectTopic(
        (state) => state.selectedSubject
    );

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

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                    <h1 className="text-xl font-bold text-indigo-600">
                        📘 AI Learning
                    </h1>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-6">
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

                    {/* Mobile menu toggle */}
                    <button
                        className="md:hidden text-gray-700 dark:text-gray-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-gray-200 px-3 py-1 rounded-lg"
                        >
                            {darkMode ? '🌞 Light' : '🌙 Dark'}
                        </button>
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 px-6 py-3 space-y-2">
                        <a href="#" className="block hover:text-indigo-500">
                            Dashboard
                        </a>
                        <a href="#" className="block hover:text-indigo-500">
                            Subjects
                        </a>
                        <a href="#" className="block hover:text-indigo-500">
                            Public Library
                        </a>
                        <a href="#" className="block hover:text-indigo-500">
                            Settings
                        </a>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-full bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-gray-200 px-3 py-2 rounded-lg"
                        >
                            {darkMode ? '🌞 Light' : '🌙 Dark'}
                        </button>
                    </div>
                )}
            </header>

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
                Dashboard → {selectedSubject?.title} →{' '}
                <span className="text-indigo-600">{selectedTopic?.title}</span>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
                {/* Left */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Topic */}
                    {selectedTopic?.output?.content.map((obj) =>
                        obj.type === 'text' ? (
                            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <h2 className="text-2xl font-bold mb-2">
                                    🗺️ {obj?.heading}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {obj?.data}
                                </p>
                            </section>
                        ) : obj.type === 'code' ? (
                            <section className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                                <div className="bg-gray-800 px-4 py-2 flex gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                </div>
                                <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
                                    <code>
                                        {
                                            obj?.data
                                        }
                                    </code>
                                </pre>
                            </section>
                        ) : (
                            ''
                        )
                    )}
                    {/* <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-2">
                            🗺️ {selectedTopic?.title}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">
                            {selectedTopic?.output?.content[0]?.data}
                        </p>
                    </section>

                    {/* Code Block */}
                    <section className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                        <div className="bg-gray-800 px-4 py-2 flex gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
                            <code>
                                {selectedTopic?.output?.content[1]?.data}
                            </code>
                        </pre>
                    </section> */}

                    {/* Flashcards */}
                    <section>
                        <h3 className="text-xl font-semibold mb-3">
                            📑 Flashcards
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {selectedTopic?.output?.flashcards?.map(
                                (card, i) => (
                                    <div
                                        key={i}
                                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                                    >
                                        <p className="font-semibold">
                                            Q: {card.question}
                                        </p>
                                        <p className="mt-2 text-indigo-600">
                                            A: {card.answer}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </section>

                    {/* Quiz */}
                    <section>
                        <h3 className="text-xl font-semibold mb-3">📝 Quiz</h3>
                        <div className="space-y-4">
                            {selectedTopic?.output?.quizzes?.map((q, i) => (
                                <QuizQuestion key={i} q={q} i={i} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right */}
                <aside className="space-y-6">
                    {/* Progress */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">📊 Progress</h3>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-indigo-500"
                                style={{ width: '60%' }}
                            ></div>
                        </div>
                        <p className="text-sm mt-2">60% completed</p>
                    </div>

                    {/* Done */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">✅ Mark as Done</h3>
                        <button
                            onClick={() => setDone(!done)}
                            className={`px-4 py-2 rounded-lg w-full ${
                                done
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        >
                            {done ? 'Done ✔' : 'Mark this topic as Done'}
                        </button>
                    </div>

                    {/* Notes */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold mb-2">📝 Self Notes</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write your own notes..."
                            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            rows="5"
                        />
                        <button className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                            Save Notes
                        </button>
                    </div>
                </aside>
            </main>
        </div>
    );
}
