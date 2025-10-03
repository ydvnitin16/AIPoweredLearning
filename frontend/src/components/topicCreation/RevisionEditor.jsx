export default function RevisionEditor({ revision, setRevision }) {
  return (
    <div className="p-6 rounded-2xl border focus:outline-none border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 shadow-md space-y-3 transition-colors">
      <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
        Revision Notes
      </h2>
      <textarea
        placeholder="Write short revision notes..."
        value={revision}
        onChange={(e) => setRevision(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700  text-zinc-800 dark:text-zinc-100 
                         bg-white dark:bg-zinc-900 
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
    </div>
  );
}
