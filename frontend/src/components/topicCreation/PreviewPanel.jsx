import ContentRenderer from '../../components/topics/ContentRenderer.jsx'; // your existing component

export default function PreviewPanel({
    title,
    content,
    flashcards,
    quizzes,
    practice,
    revision,
}) {
    return (
        <div className="p-6 rounded-2xl border focus:outline-none border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 shadow-md space-y-6 transition-colors">
            <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                Preview
            </h2>

            {/* Topic Title */}
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                {title}
            </h3>

            {/* Content Blocks */}
            <div className="space-y-4">
                {content.map((c, idx) => (
                    <ContentRenderer key={idx} obj={c} idx={idx} />
                ))}
            </div>

            {/* Flashcards */}
            {flashcards?.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                        Flashcards
                    </h3>
                    {flashcards.map((f, idx) => (
                        <p
                            key={idx}
                            className="text-zinc-700 dark:text-zinc-200"
                        >
                            Q: {f.question} — A: {f.answer}
                        </p>
                    ))}
                </div>
            )}

            {/* Quizzes */}
            {quizzes?.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                        Quizzes
                    </h3>
                    {quizzes.map((q, idx) => (
                        <div
                            key={idx}
                            className="p-3 border rounded bg-white dark:bg-zinc-800 dark:border-zinc-700 space-y-1"
                        >
                            <p className="font-medium text-zinc-800 dark:text-zinc-100">
                                {q.question}
                            </p>
                            <ul className="list-disc ml-4 text-zinc-700 dark:text-zinc-200">
                                {q.options.map((o, i) => (
                                    <li key={i}>{o}</li>
                                ))}
                            </ul>
                            <p className="text-green-600 dark:text-green-400 font-medium">
                                Answer: {q.answer}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Practice Questions */}
            {practice?.length > 0 && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                        Practice Questions
                    </h3>
                    {practice.map((p, idx) => (
                        <p
                            key={idx}
                            className="text-zinc-700 dark:text-zinc-200"
                        >
                            Q: {p.question} — A: {p.answer}
                        </p>
                    ))}
                </div>
            )}

            {/* Revision */}
            {revision && (
                <div className="space-y-2">
                    <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
                        Revision Notes
                    </h3>
                    <p className="text-zinc-700 dark:text-zinc-200">
                        {revision}
                    </p>
                </div>
            )}
        </div>
    );
}
