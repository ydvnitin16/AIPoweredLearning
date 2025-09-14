import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const SuggestedTopicCard = ({ topicName, onGenerate }) => {
    const [isGenerating, setisGenerating] = useState(false)

    return (
        <div
            className="group bg-white dark:bg-zinc-900 border
                       border-zinc-200 dark:border-zinc-800 
                       rounded-xl p-5 flex items-center justify-between 
                       hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow transition"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-800">
                    <Sparkles size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-md font-medium text-zinc-800 dark:text-zinc-100">
                        {topicName}
                    </h3>
                </div>
            </div>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onGenerate(topicName, setisGenerating);
                    setisGenerating(true)
                }}
                className={`px-3 py-1.5 text-md font-medium 
                           bg-indigo-600 text-white rounded-lg 
                           hover:bg-indigo-700 dark:bg-indigo-500 
                           dark:hover:bg-indigo-600 transition cursor-pointer`}
                           disabled={isGenerating}
            >
                {isGenerating ? "Generating..." : "Generate"}
            </button>
        </div>
    );
};

export default SuggestedTopicCard;
