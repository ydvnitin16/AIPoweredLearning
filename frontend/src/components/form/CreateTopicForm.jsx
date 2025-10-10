import { useState, Suspense, lazy } from 'react';
import { useCreateTopic } from '../../hooks/UseCreateTopic';
import Loading from '../common/Loading';

// Lazy load topic creation components
const ContentEditor = lazy(() => import('../topicCreation/ContentEditor'));
const FlashcardBuilder = lazy(() => import('../topicCreation/FlashcardBuilder'));
const QuizBuilder = lazy(() => import('../topicCreation/Quizbuilder'));
const PracticeBuilder = lazy(() => import('../topicCreation/Practicebuilder'));
const RevisionEditor = lazy(() => import('../topicCreation/RevisionEditor'));
const PreviewPanel = lazy(() => import('../topicCreation/PreviewPanel'));

export default function CreateTopicForm({ subjectId }) {
    const { createTopic, loading, error, success } = useCreateTopic();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [flashcards, setFlashcards] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [practiceQuestions, setPracticeQuestions] = useState([]);
    const [revision, setRevision] = useState('');

    const handleSave = async () => {
  const formData = new FormData();

  formData.append("subjectId", subjectId);
  formData.append("topic", title);

  const output = {
    flashcards,
    quizzes,
    practiceQuestions,
    revision,
    content: [...content],
  };

  output.content.forEach((block, idx) => {
      if (block.type === "image" && block.data?.file) {
          formData.append("images", block.data.file);
      block.data = { placeholder: `image-${idx}` };
    }
  });

  formData.append("output", JSON.stringify(output));
  
  const result = await createTopic(formData);
};


    return (
        <div className="space-y-6 p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-md transition-colors">
            {/* Title */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Topic Title
                </label>
                <input
                    type="text"
                    placeholder="Enter topic title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 
                     bg-white dark:bg-zinc-900 
                     focus:ring-2 focus:ring-blue-500 outline-none transition"
                />
            </div>

            {/* Builders */}
            <Suspense fallback={<Loading />}>
                <ContentEditor content={content} setContent={setContent} />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <FlashcardBuilder
                    flashcards={flashcards}
                    setFlashcards={setFlashcards}
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <QuizBuilder quizzes={quizzes} setQuizzes={setQuizzes} />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <PracticeBuilder
                    practice={practiceQuestions}
                    setPractice={setPracticeQuestions}
                />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <RevisionEditor revision={revision} setRevision={setRevision} />
            </Suspense>

            {/* Preview */}
            <div className="border rounded-xl bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 p-4">
                <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-zinc-100">
                    Preview
                </h3>
                <Suspense fallback={<Loading />}>
                    <PreviewPanel
                        title={title}
                        content={content}
                        flashcards={flashcards}
                        quizzes={quizzes}
                        practice={practiceQuestions}
                        revision={revision}
                    />
                </Suspense>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 rounded-xl font-medium 
                     bg-blue-600 text-white shadow-md 
                     hover:bg-blue-700 disabled:opacity-50 
                     transition cursor-pointer"
                >
                    {loading ? 'Saving...' : 'Save Topic'}
                </button>
            </div>

            {/* Status messages */}
            {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
            )}
            {success && (
                <p className="text-sm text-green-600 font-medium">
                    ✅ Topic created successfully!
                </p>
            )}
        </div>
    );
}
