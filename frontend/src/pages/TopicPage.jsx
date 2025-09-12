import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic.jsx';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ContentRenderer from '../components/topics/contentRenderer.jsx';
import { UseAuthStore } from '../stores/UseAuthStore.jsx';
import RenderFlashcard from '../components/topics/RenderFlashcard.jsx';
import QuizQuestion from '../components/topics/QuizQuestion.jsx';
import PracticeQuestion from '../components/topics/PracticeQuestion.jsx';

export default function TopicPage() {
    const navigate = useNavigate();
    const selectedTopic = UseSelectedSubjectTopic((s) => s.selectedTopic);
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const userStore = UseAuthStore((s) => s.userStore);

    // defensive defaults
    const contentArr = selectedTopic?.output?.content || [];
    const flashcards = selectedTopic?.output?.flashcards || [];
    const quizzes = selectedTopic?.output?.quizzes || [];
    const revision = selectedTopic?.output?.revision || null;
    const practiceQuestions = selectedTopic?.output?.practiceQuestions || [];

    return (
        <div className="min-h-screen max-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 font-medium sm:px-6 py-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex flex-wrap gap-1 sm:gap-2 items-center">
                    <span
                        onClick={() => navigate(-2)}
                        className="truncate cursor-pointer"
                    >
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
            <div className="w-full">
                <main className="max-w-screen mx-auto px-4 sm:px-6 grid gap-4 sm:gap-6 lg:grid-cols-3 py-4">
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
                            return (
                                <ContentRenderer
                                    key={idx}
                                    obj={obj}
                                    idx={idx}
                                />
                            );
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
                                    {revision ?? ''}
                                </ReactMarkdown>
                            </div>
                        </section>

                        {/* Flashcards */}
                        <RenderFlashcard flashcards={flashcards} />

                        {/* Quiz */}
                        {quizzes?.length > 0 && (
                            <section>
                                <h3 className="text-lg sm:text-xl font-semibold mb-3">
                                    📝 Quiz
                                </h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {quizzes?.length === 0 && (
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            No quiz available.
                                        </p>
                                    )}
                                    {quizzes?.map((q, i) => (
                                        <QuizQuestion key={i} q={q} i={i} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {practiceQuestions.length > 0 && (
                            <section className="space-y-4">
                                <h2 className="text-lg sm:text-xl font-semibold mb-3">
                                    Practice Questions
                                </h2>

                                <div className="grid gap-4">
                                    {practiceQuestions.map((q, idx) => (
                                        <PracticeQuestion
                                            key={idx}
                                            index={idx + 1}
                                            question={q.question}
                                            answer={q.answer}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right sidebar */}
                    {selectedSubject?.createdBy === userStore.id && (
                        <aside className="space-y-4 sm:space-y-6">
                            {/* Mark as done */}
                            <label className="inline-flex w-full items-center cursor-pointer ">
                                <input
                                    type="checkbox"
                                    // defaultChecked={selectedTopic?.isDone}
                                    // onChange={(e) => {handleMarkDone(e); console.log(selectedTopic)}}
                                    className="sr-only peer"
                                />
                                <div
                                    className={`text-center px-4 py-2 rounded-lg w-full transition-colors duration-200 ${
                                        ''
                                            ? 'bg-green-500 hover:bg-green-600 text-white'
                                            : 'bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-zinc-300 text-zinc-900 dark:text-white'
                                    }`}
                                >
                                    {'' ? 'Done' : 'Mark As Done'}
                                </div>
                            </label>

                            {/* Self notes */}
                            <div className="bg-white dark:bg-zinc-800 p-4 sm:p-6 rounded-xl shadow-md">
                                <h3 className="font-semibold mb-2">
                                    📝 Self Notes
                                </h3>
                                <textarea
                                    placeholder="Write your own notes..."
                                    className="w-full p-3 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 resize-y min-h-[120px]"
                                    rows={5}
                                />
                                <div className="mt-3 flex gap-2">
                                    <button className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                                        Save Notes
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700">
                                        Clear
                                    </button>
                                </div>
                            </div>
                        </aside>
                    )}
                </main>
            </div>
        </div>
    );
}
