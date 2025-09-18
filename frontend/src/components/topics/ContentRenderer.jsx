// components/ContentRenderer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Formula rendering (using KaTeX/MathJax, choose one; here I’ll show KaTeX)
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const ContentRenderer = ({ obj, idx }) => {
  const components = {
    text: () => (
      <section
        key={`text-${idx}`}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-md"
      >
        {obj?.heading && (
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {obj.heading}
          </h2>
        )}
        <div className="prose prose-zinc max-w-none prose-sm sm:prose-base dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {obj.data ?? ""}
          </ReactMarkdown>
        </div>
      </section>
    ),

    code: () => (
      <section
        key={`code-${idx}`}
        className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="dark:bg-zinc-800 bg-white px-3 sm:px-4 py-2 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <pre className="p-3 sm:p-4 overflow-x-auto dark:text-zinc-100 bg-gray-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm">
          <code>{obj.data ?? ""}</code>
        </pre>
      </section>
    ),

    image: () => (
      <section
        key={`img-${idx}`}
        className="bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl shadow-md"
      >
        <img
          src={obj.data}
          alt={obj.heading ?? "image"}
          className="w-full rounded-lg object-cover"
        />
      </section>
    ),

    formula: () => (
      <section
        key={`formula-${idx}`}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-md"
      >
        {obj?.heading && (
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {obj.heading}
          </h2>
        )}
        {/* Render formula */}
        <BlockMath math={obj.data} />
      </section>
    ),
  };

  // If type exists → render, else fallback
  const Component = components[obj?.type] || (() => (
    <section
      key={`unknown-${idx}`}
      className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 p-4 rounded-xl shadow"
    >
      <p>Unsupported content type: <b>{obj?.type}</b></p>
      <pre className="text-xs sm:text-sm mt-2">{JSON.stringify(obj, null, 2)}</pre>
    </section>
  ));

  return <Component />;
};

export default ContentRenderer;
