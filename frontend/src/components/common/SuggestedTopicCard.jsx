import { Sparkles } from 'lucide-react';
import React from 'react';

const SuggestedTopicCard = ({ setIsOpen, topicName }) => {
    return (
        <div
            onClick={() => setIsOpen(true)}
            className="group bg-white dark:bg-zinc-900 border
                       border-zinc-200 dark:border-zinc-800 
                       rounded-xl p-5 flex items-center justify-between 
                       hover:border-indigo-500 hover:shadow transition"
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
                    setIsOpen(true);
                }}
                className="px-3 py-1.5 text-md font-medium 
                           bg-indigo-600 text-white rounded-lg 
                           hover:bg-indigo-700 dark:bg-indigo-500 
                           dark:hover:bg-indigo-600 transition cursor-pointer"
            >
                Generate
            </button>
        </div>
    );
};

export default SuggestedTopicCard;
