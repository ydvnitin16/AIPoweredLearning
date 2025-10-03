export default function QuizBuilder({ quizzes, setQuizzes }) {
  const addQuiz = () => {
    setQuizzes([...quizzes, { question: "", options: [""], answer: "" }]);
  };

  const updateQuiz = (idx, key, value) => {
    const updated = [...quizzes];
    updated[idx][key] = value;
    setQuizzes(updated);
  };

  const addOption = (idx) => {
    const updated = [...quizzes];
    updated[idx].options.push("");
    setQuizzes(updated);
  };

  return (
    <div className="p-6 rounded-2xl border focus:outline-none border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 shadow-md space-y-4 transition-colors">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">Quizzes</h2>

      <button
        onClick={addQuiz}
        className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 
                   hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
      >
        + Add Quiz
      </button>

      <div className="space-y-4">
        {quizzes.map((q, idx) => (
          <div key={idx} className="p-4 rounded-xl border bg-white dark:bg-zinc-800 dark:border-zinc-700 shadow-sm space-y-3">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => updateQuiz(idx, "question", e.target.value)}
              className="w-full px-3 py-2 rounded-lg  border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {q.options.map((opt, oidx) => (
              <input
                key={oidx}
                type="text"
                placeholder={`Option ${oidx + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...quizzes];
                  updated[idx].options[oidx] = e.target.value;
                  setQuizzes(updated);
                }}
                className="w-full px-3 py-2 rounded-lg  border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            ))}

            <button
              onClick={() => addOption(idx)}
              className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 
                         hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm cursor-pointer"
            >
              + Add Option
            </button>

            <input
              type="text"
              placeholder="Correct Answer"
              value={q.answer}
              onChange={(e) => updateQuiz(idx, "answer", e.target.value)}
              className="w-full px-3 py-2 rounded-lg  border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
