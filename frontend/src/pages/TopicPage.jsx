import React, { useState } from "react";

export default function TopicPage() {
    // data.js (or you can directly keep inside your component as const)
const jsMapData = {
  code: `// Example: Using Map in JavaScript

const map = new Map();

// Add values
map.set("name", "Nitin");
map.set("age", 21);
map.set("isStudent", true);

// Access values
console.log(map.get("name")); // "Nitin"

// Check existence
console.log(map.has("age")); // true

// Iterate
for (let [key, value] of map) {
  console.log(key, value);
}`, 

  flashcards: [
    {
      question: "What is a Map in JavaScript?",
      answer: "A Map is a collection of key-value pairs where keys can be of any type."
    },
    {
      question: "How to add an element in Map?",
      answer: "Use the set(key, value) method."
    },
    {
      question: "How to check if a key exists?",
      answer: "Use the has(key) method."
    },
    {
      question: "How to get the value of a key?",
      answer: "Use the get(key) method."
    }
  ],

  quiz: [
    {
      question: "Which method is used to insert data into a Map?",
      options: ["add()", "set()", "put()", "insert()"],
      answer: "set()"
    },
    {
      question: "What type of values can Map keys have?",
      options: ["Only string", "Only number", "Any type", "Only boolean"],
      answer: "Any type"
    },
    {
      question: "Which method checks if a key exists in a Map?",
      options: ["get()", "exists()", "has()", "find()"],
      answer: "has()"
    }
  ]
};

  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <h1 className="text-xl font-bold text-indigo-600">📘 AI Learning</h1>
          <nav className="space-x-6 hidden md:flex">
            <a href="#" className="hover:text-indigo-500">Dashboard</a>
            <a href="#" className="hover:text-indigo-500">Subjects</a>
            <a href="#" className="hover:text-indigo-500">Public Library</a>
            <a href="#" className="hover:text-indigo-500">Settings</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg">
              Dark 🌙
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
        Dashboard → JavaScript → <span className="text-indigo-600">Map</span>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-6">
        {/* Left - Learning Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Topic card */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2">🗺️ Map in JavaScript</h2>
            <p className="text-gray-700 dark:text-gray-300">
              The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">Map</code> 
              object in JavaScript is a collection of key-value pairs where keys can be of any type. 
              It remembers insertion order and provides helpful methods like{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">set()</code>,{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">get()</code>, and{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">has()</code>.
            </p>
          </section>

          {/* Code Block */}
          <section className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-800 px-4 py-2 flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <pre className="p-4 overflow-x-auto text-gray-100 text-sm">
              <code>{jsMapData.code}</code>
            </pre>
          </section>

          {/* Flashcards */}
          <section>
            <h3 className="text-xl font-semibold mb-3">📑 Flashcards</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {jsMapData.flashcards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <p className="font-semibold">Q: {card.question}</p>
                  <p className="mt-2 text-indigo-600">A: {card.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz */}
          <section>
            <h3 className="text-xl font-semibold mb-3">📝 Quiz</h3>
            <div className="space-y-4">
              {jsMapData.quiz.map((q, i) => (
                <QuizQuestion key={i} q={q} i={i} />
              ))}
            </div>
          </section>
        </div>

        {/* Right - Status & Notes */}
        <aside className="space-y-6">
          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">📊 Progress</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500" style={{ width: "60%" }}></div>
            </div>
            <p className="text-sm mt-2">60% completed</p>
          </div>

          {/* Mark as Done */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">✅ Mark as Done</h3>
            <button
              onClick={() => setDone(!done)}
              className={`px-4 py-2 rounded-lg w-full ${
                done ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {done ? "Done ✔" : "Mark this topic as Done"}
            </button>
          </div>

          {/* Self Notes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">📝 Self Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your own notes..."
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows="5"
            />
            <button className="mt-3 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
              Save Notes
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

function QuizQuestion({ q, i }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <p className="font-medium mb-2">{i + 1}. {q.question}</p>
      <div className="space-y-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            className={`w-full text-left px-3 py-2 rounded-lg border ${
              selected === opt
                ? opt === q.answer
                  ? "bg-green-200 border-green-500"
                  : "bg-red-200 border-red-500"
                : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
