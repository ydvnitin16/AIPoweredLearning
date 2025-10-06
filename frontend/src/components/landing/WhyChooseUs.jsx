// src/components/landing/WhyChooseUs.jsx
import React from "react";
import { BookOpen, ClipboardCheck, Share2, Layers, FolderPlus, Image } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "AI-Powered Summaries",
      desc: "Generate concise summaries for each topic to review key points quickly.",
      icon: <BookOpen className="w-6 h-6 text-white" />,
    },
    {
      title: "Smart Flashcards & Quizzes",
      desc: "Create flashcards and quizzes from your topics to reinforce learning.",
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
    },
    {
      title: "Share & Import Subjects",
      desc: "Easily share or import subjects and topics using unique IDs.",
      icon: <Share2 className="w-6 h-6 text-white" />,
    },
    {
      title: "Interactive Visuals",
      desc: "Visualize concepts with React Flow diagrams and Viz.js graphs.",
      icon: <Layers className="w-6 h-6 text-white" />,
    },
    {
      title: "Topic Management",
      desc: "Organize and track topics with AI-assisted content creation.",
      icon: <FolderPlus className="w-6 h-6 text-white" />,
    },
    {
      title: "Media Integration",
      desc: "Upload images, formulas, and code snippets in topics.",
      icon: <Image className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section id="specialties" className="py-20 dark:bg-zinc-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">Why Choose SmartStudyAI?</h3>
        <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-12">
          Learn smarter with AI-powered tools to create, organize, and review your study material effectively.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ title, desc, icon }) => (
            <div
              key={title}
              className="bg-gradient-to-br from-[#f8fbff] to-[#eef3ff] dark:from-[#15151f] dark:to-[#0f0f1c] rounded-2xl p-6 md:p-8 border border-gray-300 dark:border-gray-800"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 mb-6">
                {icon}
              </div>
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
