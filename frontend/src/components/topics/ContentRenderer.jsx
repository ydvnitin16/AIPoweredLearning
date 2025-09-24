// components/ContentRenderer.jsx
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    vs,
    vscDarkPlus,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

// Formula rendering (using KaTeX/MathJax, choose one; here I’ll show KaTeX)
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const ContentRenderer = ({ obj, idx }) => {
    const vizRef = useRef(null);

    // Viz.js rendering
    const renderViz = (dot) => {
        if (!vizRef.current) return;
        const viz = new Viz({ Module, render });
        viz.renderSVGElement(dot)
            .then((svgElement) => {
                vizRef.current.innerHTML = '';
                vizRef.current.appendChild(svgElement);
            })
            .catch((err) => console.error(err));
    };

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
                        {obj.data ?? ''}
                    </ReactMarkdown>
                </div>
            </section>
        ),

        code: () => (
            <section
                key={`code-${idx}`}
                className="bg-zinc-900 rounded-xl shadow-lg w-full overflow-hidden"
            >
                <div className="dark:bg-zinc-800 bg-white px-3 sm:px-4 py-2 flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="ml-auto font-medium truncate">
                        {obj.heading}
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <SyntaxHighlighter
                        language={obj.extension}
                        style={vscDarkPlus}
                        wrapLongLines={true} // wrap long lines
                        showLineNumbers={true} // optional, useful for DSA/code
                        customStyle={{
                            margin: 0,
                            padding: '1rem',
                            boxSizing: 'border-box',
                            whiteSpace: 'pre-wrap', // wrap lines properly
                            wordBreak: 'break-word', // break very long words
                            fontSize: '0.875rem',
                            minWidth: '100%',
                        }}
                    >
                        {obj.data ?? ''}
                    </SyntaxHighlighter>
                </div>
            </section>
        ),

        image: () => (
            <section
                key={`img-${idx}`}
                className="bg-white dark:bg-zinc-800 p-3 sm:p-4 rounded-xl shadow-md"
            >
                <img
                    src={obj.data}
                    alt={obj.heading ?? 'image'}
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

        viz: () => {
            useEffect(() => {
                if (!obj.data) return;
                const fromattedDOT = obj.data.replace(/\\n/g, '\n');
                console.log(fromattedDOT);
                renderViz(fromattedDOT); // obj.data should be valid DOT code
            }, [obj.data]);

            return (
                <section
                    key={`viz-${idx}`}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
               p-4 sm:p-6 rounded-xl shadow-md"
                >
                    {obj.heading && (
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            {obj.heading}
                        </h2>
                    )}

                    {/* Outer wrapper: prevents screen overflow */}
                    <div className="w-full overflow-x-auto">
                        {/* Inner wrapper: where viz.js injects the SVG */}
                        <div ref={vizRef} className="viz-wrapper" />
                    </div>
                </section>
            );
        },

        reactflow: () => {
            const nodes = obj.data?.nodes ?? [];
            const edges = obj.data?.edges ?? [];

            return (
                <section
                    key={`flow-${idx}`}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-md"
                    style={{ height: 400 }}
                >
                    {obj.heading && (
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">
                            {obj.heading}
                        </h2>
                    )}
                    <ReactFlow nodes={nodes} edges={edges}>
                        <Controls />
                        <Background />
                    </ReactFlow>
                </section>
            );
        },
        table: () => (
            <section
                key={`table-${idx}`}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-xl shadow-md overflow-auto"
            >
                {obj?.heading && (
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        {obj.heading}
                    </h2>
                )}
                <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                        <tr>
                            {obj.data.headers.map((h, i) => (
                                <th
                                    key={i}
                                    className="border border-gray-300 dark:border-gray-700 px-3 py-2 text-left"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {obj.data.rows.map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td
                                        key={ci}
                                        className="border border-gray-300 dark:border-gray-700 px-3 py-2"
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        ),
    };

    // If type exists → render, else fallback
    const Component =
        components[obj?.type] ||
        (() => (
            <section
                key={`unknown-${idx}`}
                className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 p-4 rounded-xl shadow"
            >
                <p>
                    Unsupported content type: <b>{obj?.type}</b>
                </p>
                <pre className="text-xs sm:text-sm mt-2">
                    {JSON.stringify(obj, null, 2)}
                </pre>
            </section>
        ));

    return <Component />;
};

export default ContentRenderer;
