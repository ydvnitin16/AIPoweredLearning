import React from 'react';

const SubjectNav = ({ subjectNav, setSubjectNav }) => {
    return (
        <div className="flex items-center justify-start flex-wrap gap-3 dark:text-white pt-4 mx-4">
            <div
                onClick={() => setSubjectNav('my-subjects')}
                className={`flex items-center gap-9 rounded-full  px-3 py-2 cursor-pointer ${
                    subjectNav === 'my-subjects'
                        ? 'bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                        : 'bg-zinc-100 dark:bg-zinc-900'
                }  `}
            >
                <span className="font-bold text-md text-black dark:text-white">
                    My Subjects
                </span>
            </div>
            <div
                onClick={() => setSubjectNav('imported-subjects')}
                className={`flex items-center gap-9 rounded-full  px-3 py-2 cursor-pointer ${
                    subjectNav === 'imported-subjects'
                        ? 'bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                        : 'bg-zinc-100 dark:bg-zinc-900'
                }  `}
            >
                <span className="font-bold text-md text-black dark:text-white">
                    Imported Subjects
                </span>
            </div>
            <div
                onClick={() => setSubjectNav('public-subjects')}
                className={`flex items-center gap-9 rounded-full  px-3 py-2 cursor-pointer ${
                    subjectNav === 'public-subjects'
                        ? 'bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'
                        : 'bg-zinc-100 dark:bg-zinc-900'
                }  `}
            >
                <span className="font-bold text-md text-black dark:text-white">
                    Public Subjects
                </span>
            </div>
        </div>
    );
};

export default SubjectNav;
