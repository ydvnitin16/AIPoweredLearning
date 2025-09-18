import { BadgeQuestionMarkIcon } from 'lucide-react';
import { useState } from 'react';

function QuizQuestion({ q, i }) {
    const [selected, setSelected] = useState(null);

    return (
         <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5">
            <p className="font-medium mb-2">
                {i + 1}. {q.question}
            </p>
            <div className="space-y-2">
                {q.options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(opt)}
                        className={`w-full text-left px-3 py-2 rounded-lg border ${
                            selected === opt
                                ? opt === q.answer
                                    ? 'bg-green-200 border-green-500 text-black'
                                    : 'bg-red-200 border-red-500 text-black'
                                : 'bg-zinc-100 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-800'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuizQuestion;
