import { useState } from 'react';
import ContentEditor from '../topicCreation/ContentEditor';
import FlashcardBuilder from '../topicCreation/FlashcardBuilder';
import QuizBuilder from '../topicCreation/Quizbuilder';
import PracticeBuilder from '../topicCreation/Practicebuilder';
import RevisionEditor from '../topicCreation/RevisionEditor';
import PreviewPanel from '../topicCreation/PreviewPanel';
import { useCreateTopic } from '../../hooks/UseCreateTopic';

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
          console.log(block.data.file)
          formData.append("images", block.data.file);
      block.data = { placeholder: `image-${idx}` };
    }
  });

  formData.append("output", JSON.stringify(output));
  

  console.log("📦 Sending FormData entries:");
  for (let [key, val] of formData.entries()) {
    console.log(key, val);
  }

  const result = await createTopic(formData);
  console.log("✅ Result:", result);
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
            <ContentEditor content={content} setContent={setContent} />
            <FlashcardBuilder
                flashcards={flashcards}
                setFlashcards={setFlashcards}
            />
            <QuizBuilder quizzes={quizzes} setQuizzes={setQuizzes} />
            <PracticeBuilder
                practice={practiceQuestions}
                setPractice={setPracticeQuestions}
            />
            <RevisionEditor revision={revision} setRevision={setRevision} />

            {/* Preview */}
            <div className="border rounded-xl bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 p-4">
                <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-zinc-100">
                    Preview
                </h3>
                <PreviewPanel
                    title={title}
                    content={content}
                    flashcards={flashcards}
                    quizzes={quizzes}
                    practice={practiceQuestions}
                    revision={revision}
                />
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
