export default function FlashcardBuilder({ flashcards, setFlashcards }) {
    const addCard = () => {
        setFlashcards([...flashcards, { question: '', answer: '' }]);
    };

    const updateCard = (idx, key, value) => {
        const updated = [...flashcards];
        updated[idx][key] = value;
        setFlashcards(updated);
    };

    return (
        <div className="p-6 rounded-2xl border focus:outline-none border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 shadow-md space-y-4 transition-colors">
            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                Flashcards
            </h2>

            <button
                onClick={addCard}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 
                   hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
            >
                + Add Flashcard
            </button>

            <div className="space-y-4">
                {flashcards.map((card, idx) => (
                    <div
                        key={idx}
                        className="p-4 rounded-xl border bg-white dark:bg-zinc-800 dark:border-zinc-700 shadow-sm space-y-2"
                    >
                        <input
                            type="text"
                            placeholder="Question"
                            value={card.question}
                            onChange={(e) =>
                                updateCard(idx, 'question', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg  border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        <input
                            type="text"
                            placeholder="Answer"
                            value={card.answer}
                            onChange={(e) =>
                                updateCard(idx, 'answer', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg  border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
