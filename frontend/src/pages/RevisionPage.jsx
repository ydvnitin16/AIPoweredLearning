import React, { useEffect, useMemo, useState } from 'react';
import { Search, BookOpen, Printer, Sparkles } from 'lucide-react';
import { UseSelectedSubjectTopic } from '../stores/UseSelectedSubjectTopic';

export default function RevisionPage() {
    const selectedSubjects_Topics = UseSelectedSubjectTopic(
        (s) => s.selectedSubjects_Topics
    );
    const selectedSubject = UseSelectedSubjectTopic(
        (s) => s.selectedSubject
    );

    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return selectedSubjects_Topics[selectedSubject?._id];
        return selectedSubjects_Topics[selectedSubject?._id].filter(
            (t) =>
                t.topic?.toLowerCase().includes(q) ||
                t.revision?.toLowerCase().includes(q)
        );
    }, [selectedSubjects_Topics, query, selectedSubject]);

    const handlePrint = () => window.print();


    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Header */}
            <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800">
                <div className="mx-auto max-w-5xl px-4 py-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="shrink-0" />
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Revision Notes
                        </h1>
                        <span className="hidden sm:inline text-xs ml-2 px-2 py-0.5 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70">
                            {filtered?.length} topics
                        </span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search topics or text…"
                                className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 outline-none focus:ring-2 focus:ring-indigo-500/40"
                            />
                        </div>
                        <button
                            onClick={handlePrint}
                            className="px-3 py-2 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 hover:bg-white/90 dark:hover:bg-zinc-900 transition flex items-center gap-2"
                        >
                            <Printer size={16} />
                            <span className="hidden sm:inline">Print</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Content grid */}
            <section className="mx-auto max-w-5xl px-4 py-6 print:px-0">
                {filtered?.length === 0 ? (
                    <EmptyState query={query} />
                ) : (
                    <div className="grid grid-cols-1 gap-4 print:gap-2">
                        {selectedSubjects_Topics && filtered?.map((t, idx) => (
                            <article
                                key={idx}
                                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-4 sm:p-5 print:shadow-none print:border-zinc-300"
                            >
                                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                                    {t.topic}
                                </h2>
                                <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                                    {t.revision}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer Hint */}
            <footer className="mx-auto max-w-5xl px-4 pb-8 opacity-80 text-xs text-zinc-500 flex items-center gap-2">
                <Sparkles size={14} /> Pro tip: Use the search box to filter
                quickly; press Ctrl/⌘+P to print or save as PDF.
            </footer>

            {/* Print styles */}
            <style>{`
        @media print {
          header, footer, .no-print { display: none !important; }
          main { background: #fff !important; color: #000 !important; }
          article { break-inside: avoid; }
        }
      `}</style>
        </main>
    );
}

function EmptyState({ query }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <p className="text-sm text-zinc-500">No topics matched "{query}"</p>
            <p className="text-xs text-zinc-400">
                Try a different keyword or clear the search.
            </p>
        </div>
    );
}
