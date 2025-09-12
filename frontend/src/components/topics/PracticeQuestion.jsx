import { useState } from 'react';

const PracticeQuestion = ({ index, question, answer }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5">
            <p className="text-lg sm:text-xl font-semibold mb-2">
                Q{index}. {question}
            </p>

            {/* Answer toggle */}
            <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="mt-3 text-sm md:text-sm px-3 py-1.5 rounded-lg 
                           bg-indigo-50 text-indigo-600 hover:bg-indigo-100 
                           dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600
                           transition cursor-pointer"
            >
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>

            {showAnswer && (
                <p className="text-md sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap mt-3 border-t border-zinc-700 pt-3">
                    {answer}
                </p>
            )}
        </div>
    );
};

export default PracticeQuestion;
