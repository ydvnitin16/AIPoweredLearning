export default function PracticeBuilder({ practice, setPractice }) {
    const addPractice = () => {
        setPractice([...practice, { question: '', answer: '' }]);
    };

    const updatePractice = (idx, key, value) => {
        const updated = [...practice];
        updated[idx][key] = value;
        setPractice(updated);
    };

    return (
        <div className="p-6 rounded-2xl border focus:outline-none border-zinc-300  bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 shadow-md space-y-4 transition-colors">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                Practice Questions
            </h2>

            <button
                onClick={addPractice}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 
                   hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
            >
                + Add Practice Question
            </button>

            <div className="space-y-4">
                {practice.map((p, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-xl border bg-white dark:bg-zinc-800 dark:border-zinc-700 shadow-sm space-y-3"
                    >
                        <input
                            type="text"
                            placeholder="Question"
                            value={p.question}
                            onChange={(e) =>
                                updatePractice(idx, 'question', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700  text-zinc-800 dark:text-zinc-100 
                         bg-white dark:bg-zinc-900 
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        <textarea
                            placeholder="Answer"
                            value={p.answer}
                            onChange={(e) =>
                                updatePractice(idx, 'answer', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700  text-zinc-800 dark:text-zinc-100 
                         bg-white dark:bg-zinc-900 
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
                            rows={3}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
