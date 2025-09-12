import React, { useEffect } from 'react';
import { getColorFromLetter } from '../../services/utils';
import { UseSelectedSubjectTopic } from '../../stores/UseSelectedSubjectTopic';
import { Clipboard, ClipboardCheck, Earth, Lock, Sparkles } from 'lucide-react';
import { UseAuthStore } from '../../stores/UseAuthStore';
import { useClipboard } from '../../hooks/UseClipboard';
import { usePublicToggle } from '../../hooks/UsePublicToggle';
import { useNavigate } from 'react-router';

const SubjectHeader = ({ setIsTopicPromptModalOpen }) => {
    const selectedSubject = UseSelectedSubjectTopic((s) => s.selectedSubject);
    const userStore = UseAuthStore((s) => s.userStore);
    const navigate = useNavigate();
    const { copy, copied } = useClipboard();
    const { handlePublicToggle } = usePublicToggle();

    const handleCopy = () => {
        if (selectedSubject?._id) {
            copy(selectedSubject?._id);
        }
    };

    return (
        <header
            className={`relative p-8 md:p-10 text-white rounded-b-3xl shadow-lg bg-gradient-to-r `}
            style={{
                backgroundColor: getColorFromLetter(selectedSubject?.title),
            }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {selectedSubject?.title}
                    </h1>
                    <p className="mt-2 text-sm/relaxed opacity-90">
                        Progress: {selectedSubject?.progress ?? 0}%
                    </p>
                    <div className="h-2 w-48 bg-white/30 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-white rounded-full"
                            style={{
                                width: `${selectedSubject?.progress ?? 0}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {selectedSubject?.createdBy === userStore.id && (
                        <button
                            onClick={() => {
                                setIsTopicPromptModalOpen(true);
                            }}
                            className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition flex items-center gap-1"
                        >
                            <Sparkles size={16} /> Add Topic (AI)
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/revision')}
                        className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition"
                    >
                        Revise
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition cursor-pointer`}
                    >
                        <span>{selectedSubject?._id}</span>
                        {copied ? (
                            <ClipboardCheck />
                        ) : (
                            <Clipboard className="w-5 h-5" />
                        )}
                    </button>
                    {selectedSubject?.createdBy === userStore.id && (
                        <label className="inline-flex items-center cursor-pointer ">
                            <input
                                type="checkbox"
                                defaultChecked={selectedSubject?.isPublic}
                                onChange={(e) =>
                                    handlePublicToggle(e, selectedSubject?._id)
                                }
                                className="sr-only peer"
                            />
                            <Lock size={17} />
                            <div className="mx-2 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            <Earth size={17} />
                        </label>
                    )}
                </div>
            </div>
        </header>
    );
};

export default SubjectHeader;
