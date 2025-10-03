import { useState } from 'react';
import { Plus } from 'lucide-react';
import ContentRenderer from '../topics/ContentRenderer';

export default function ContentEditor({ content, setContent }) {
    const codeLanguages = [
        { lang: 'javascript', extension: 'js' },
        { lang: 'python', extension: 'py' },
        { lang: 'java', extension: 'java' },
        { lang: 'c++', extension: 'cpp' },
        { lang: 'c#', extension: 'cs' },
        { lang: 'ruby', extension: 'rb' },
        { lang: 'go', extension: 'go' },
    ];

    const supportedTypes = [
        { type: 'text', label: 'Text' },
        { type: 'code', label: 'Code' },
        { type: 'formula', label: 'Formula' },
        { type: 'viz', label: 'Viz' },
        { type: 'reactflow', label: 'ReactFlow' },
        { type: 'image', label: 'Image' },
        { type: 'table', label: 'Table' },
    ];

    const addBlock = (type) => {
        let newBlock = {
            type,
            heading: '',
            data: '',
        };

        if (type === 'code') {
            newBlock = { ...newBlock, extension: 'js', language: 'javascript' };
        }

        if (type === 'table') {
            newBlock.data = {
                headers: ['Heading 1', 'Heading 2'],
                rows: [['', '']],
            };
        }

        if (type === 'reactflow') {
            newBlock.data = { nodes: [], edges: [] };
        }

        setContent([...content, newBlock]);
    };

    const updateBlock = (idx, key, value) => {
        const updated = [...content];
        updated[idx][key] = value;
        setContent(updated);
        console.log(content);
    };

    const handleFileChange = (idx, file) => {
        const updated = [...content];
        updated[idx].data = {
            file,
            url: URL.createObjectURL(file),
        };
        setContent(updated);
    };

    const handleUrlChange = (idx, url) => {
        const updated = [...content];
        updated[idx].data = {
            url,
        };
        setContent(updated);
    };

    // Table-specific updates
    const addTableHeader = (idx) => {
        const updated = [...content];
        updated[idx].data.headers.push('');
        updated[idx].data.rows.forEach((row) => row.push(''));
        setContent(updated);
    };

    const updateTableHeader = (blockIdx, headerIdx, value) => {
        const updated = [...content];
        updated[blockIdx].data.headers[headerIdx] = value;
        setContent(updated);
    };

    const addTableRow = (idx) => {
        const updated = [...content];
        updated[idx].data.rows.push(
            Array(updated[idx].data.headers.length).fill('')
        );
        setContent(updated);
    };

    const updateTableCell = (blockIdx, rowIdx, cellIdx, value) => {
        const updated = [...content];
        updated[blockIdx].data.rows[rowIdx][cellIdx] = value;
        setContent(updated);
    };

    return (
        <div className="flex gap-6 w-full h-full">
            {/* Editor */}
            <div className="flex-1 p-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-md space-y-6 overflow-y-auto max-h-screen transition-colors duration-300">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                    Content Blocks
                </h2>

                {/* Add buttons */}
                <div className="flex flex-wrap gap-3">
                    {supportedTypes.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => addBlock(btn.type)}
                            className="flex justify-center items-center gap-x-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 
                hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors shadow-sm"
                        >
                            <Plus size={'16px'} /> {btn.label}
                        </button>
                    ))}
                </div>

                {/* Render all blocks */}
                <div className="space-y-5">
                    {content.map((block, idx) => (
                        <div
                            key={idx}
                            className="p-4 rounded-xl border border-zinc-300 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-700 shadow-sm space-y-3"
                        >
                            {/* Heading */}
                            <input
                                type="text"
                                placeholder="Heading"
                                value={block.heading}
                                onChange={(e) =>
                                    updateBlock(idx, 'heading', e.target.value)
                                }
                                className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                            />

                            {/* Text */}
                            {block.type === 'text' && (
                                <textarea
                                    value={block.data}
                                    onChange={(e) =>
                                        updateBlock(idx, 'data', e.target.value)
                                    }
                                    rows={4}
                                    placeholder="Write text..."
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                />
                            )}

                            {/* Code */}
                            {block.type === 'code' && (
                                <>
                                    <div className="flex gap-2 mb-2">
                                        <select
                                            value={block.language}
                                            onChange={(e) =>
                                                updateBlock(
                                                    idx,
                                                    'language',
                                                    e.target.value
                                                )
                                            }
                                            className="px-2 py-1 dark:text-white rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
                                        >
                                            {codeLanguages.map((lang) => (
                                                <option
                                                    key={lang.lang}
                                                    value={lang.lang}
                                                    className="dark:text-white dark:bg-black"
                                                >
                                                    {lang.lang.toUpperCase()}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={block.extension}
                                            onChange={(e) =>
                                                updateBlock(
                                                    idx,
                                                    'extension',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Extension"
                                            className="px-2 py-1 rounded-lg border dark:text-white focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <textarea
                                        value={block.data}
                                        onChange={(e) =>
                                            updateBlock(
                                                idx,
                                                'data',
                                                e.target.value
                                            )
                                        }
                                        rows={6}
                                        placeholder="Write code..."
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 font-mono focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                    />
                                </>
                            )}

                            {/* Formula */}
                            {block.type === 'formula' && (
                                <textarea
                                    value={block.data}
                                    onChange={(e) =>
                                        updateBlock(idx, 'data', e.target.value)
                                    }
                                    rows={4}
                                    placeholder="Write formula..."
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                />
                            )}

                            {/* Reactflow */}
                            {block.type === 'reactflow' && (
                                <textarea
                                    value={JSON.stringify(block.data)}
                                    onChange={(e) =>
                                        updateBlock(
                                            idx,
                                            'data',
                                            JSON.parse(e.target.value)
                                        )
                                    }
                                    rows={6}
                                    placeholder="Enter diagram JSON/DOT..."
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                />
                            )}

                            {/* Viz */}
                            {block.type === 'viz' && (
                                <textarea
                                    value={block.data}
                                    onChange={(e) =>
                                        updateBlock(idx, 'data', e.target.value)
                                    }
                                    rows={6}
                                    placeholder="Enter DOT language (e.g., graph TD; A-->B;)"
                                    className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100 font-mono"
                                />
                            )}

                            {/* Image */}
                            {block.type === 'image' && (
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleFileChange(
                                                idx,
                                                e.target.files[0]
                                            )
                                        }
                                        className="dark:text-white cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Or enter image URL"
                                        value={block.data.url || ''}
                                        onChange={(e) =>
                                            handleUrlChange(idx, e.target.value)
                                        }
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                    />
                                    {block.data && (
                                        <img
                                            src={block.data.url}
                                            alt=""
                                            className="max-h-48 rounded mt-2"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Table */}
                            {block.type === 'table' && (
                                <div className="space-y-2">
                                    <h4 className="font-semibold dark:text-white">
                                        Headers
                                    </h4>
                                    <div className="flex gap-2 flex-wrap">
                                        {block.data.headers.map(
                                            (header, hIdx) => (
                                                <input
                                                    key={hIdx}
                                                    value={header}
                                                    placeholder={`Header ${
                                                        hIdx + 1
                                                    }`}
                                                    onChange={(e) =>
                                                        updateTableHeader(
                                                            idx,
                                                            hIdx,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-2 py-1 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                                />
                                            )
                                        )}
                                        <button
                                            onClick={() => addTableHeader(idx)}
                                            className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
                                        >
                                            + Header
                                        </button>
                                    </div>

                                    <h4 className="font-semibold dark:text-white">
                                        Rows
                                    </h4>
                                    {block.data.rows.map((row, rIdx) => (
                                        <div
                                            key={rIdx}
                                            className="flex gap-2 flex-wrap mb-1"
                                        >
                                            {row.map((cell, cIdx) => (
                                                <input
                                                    key={cIdx}
                                                    value={cell}
                                                    placeholder={`Cell ${
                                                        cIdx + 1
                                                    }`}
                                                    onChange={(e) =>
                                                        updateTableCell(
                                                            idx,
                                                            rIdx,
                                                            cIdx,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="px-2 py-1 rounded-lg border focus:outline-none border-zinc-300 dark:border-zinc-700  focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-zinc-100"
                                                />
                                            ))}
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addTableRow(idx)}
                                        className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition shadow-sm"
                                    >
                                        + Add Row
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Live Preview */}
            <div className="hidden lg:block flex-1 p-6 rounded-2xl border focus:outline-none border-zinc-300 dark:border-zinc-700  bg-gray-50 dark:bg-zinc-900 shadow-md space-y-4 overflow-y-auto max-h-screen">
                <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                    Live Preview
                </h2>
                {content.map((block, idx) => (
                    <ContentRenderer key={idx} obj={block} idx={idx} />
                ))}
            </div>
        </div>
    );
}
