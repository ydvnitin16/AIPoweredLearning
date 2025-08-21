import { useState } from 'react';

function QuizQuestion({ q, i }) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
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
                                    ? 'bg-green-200 border-green-500'
                                    : 'bg-red-200 border-red-500'
                                : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
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
