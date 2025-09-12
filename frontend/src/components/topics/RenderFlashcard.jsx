import React from 'react';

const RenderFlashcard = ({ flashcards }) => {
    if (!flashcards?.length) {
        return null;
    }
    return (
        <section>
            <h3 className="text-lg sm:text-xl font-semibold mb-3">
                📑 Flashcards
            </h3>

            {/* Mobile: horizontal snap; >=sm: grid */}
            <div className=" -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-2 sm:grid sm:grid-cols-2 sm:gap-4">
                {flashcards.map((card, i) => (
                    <div
                        key={i}
                        className="min-w-[85%] snap-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5"
                    >
                        <p className="font-semibold">Q: {card.question}</p>
                        <p className="mt-2 dark:text-indigo-500 text-indigo-600">
                            A: {card.answer}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RenderFlashcard;
