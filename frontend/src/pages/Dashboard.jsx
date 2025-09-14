import { useState } from 'react';
import {
    Plus,
    BookOpen,
    Compass,
    ArrowDownCircle,
    Sparkle,
    Megaphone,
} from 'lucide-react';
import SubjectFormModal from '../components/form/SubjectFormModal.jsx';
import ImportSubject from '../components/form/ImportSubject.jsx';
import { useSubjects } from '../hooks/UseSubjects.jsx';
import { useImportedSubjects } from '../hooks/UseImportedSubjects.jsx';
import { usePublicSubjects } from '../hooks/UsePublicSubjects.jsx';
import RenderSubjectList from '../components/subject/RenderSubjectList.jsx';
import SubjectNav from '../components/common/SubjectNav.jsx';

export default function Dashboard() {
    const [isSubjectModalOpen, setIsSubjectModalOpen] = useState();
    const [isImportModalOpen, setIsImportModalOpen] = useState();
    const [subjectCreatingQueue, setSubjectCreatingQueue] = useState(0);
    const [subjectImportingQueue, setSubjectImportingQueue] = useState(0);

    const [subjectNav, setSubjectNav] = useState('my-subjects');

    return (
        <>
            <SubjectFormModal
                setSubjectCreatingQueue={setSubjectCreatingQueue}
                isOpen={isSubjectModalOpen}
                onClose={() => setIsSubjectModalOpen(false)}
            />
            <ImportSubject
                setSubjectImportingQueue={setSubjectImportingQueue}
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
            />
            <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors dark:bg-black">
                {/* Top Navigation */}
                <SubjectNav
                    subjectNav={subjectNav}
                    setSubjectNav={setSubjectNav}
                />

                <main className="px-6 py-4 md:p-8 max-w-7xl mx-auto">
                    {/* My Subjects Section */}
                    {subjectNav === 'my-subjects' && (
                        <section className="mb-12">
                            <div className="flex justify-between sm:items-center gap-4 mb-6">
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <BookOpen size={20} /> My Subjects
                                </h2>
                                <button
                                    onClick={() => setIsSubjectModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                                bg-indigo-600 text-white hover:bg-indigo-700
                                dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow"
                                >
                                    <Plus size={18} /> Add Subject
                                </button>
                            </div>

                            {/* Render My Subjects */}
                            <RenderSubjectList
                                subjectHook={useSubjects}
                                loadingQueue={subjectCreatingQueue}
                                msg={`creating subject ${subjectCreatingQueue} in queue`}
                            />
                        </section>
                    )}

                    {subjectNav === 'imported-subjects' && (
                        <section>
                            <div className="flex justify-between mb-5">
                                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <Compass size={20} /> Imported Subjects
                                </h2>
                                <button
                                    onClick={() => setIsImportModalOpen(true)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:shadow-md transition ${
                                        ''
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    <ArrowDownCircle className="w-5 h-5" />
                                    <span>Import</span>
                                </button>
                            </div>
                            <p className="mx-auto max-w-5xl pb-4 px-4 opacity-80 text-sm text-zinc-800 dark:text-zinc-400 flex items-center gap-2">
                                <Megaphone /> These subjects sharing the
                                reference of the original subject all the action
                                performed by the owner is reflected here.
                            </p>

                            {/* Render Imported Subjects */}
                            <RenderSubjectList
                                subjectHook={useImportedSubjects}
                                loadingQueue={subjectImportingQueue}
                                msg={`Importing subject ${subjectImportingQueue} in queue`}
                            />
                        </section>
                    )}

                    {/* Public Subjects Section */}
                    {subjectNav === 'public-subjects' && (
                        <section>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 my-6 flex items-center gap-2">
                                <Compass size={20} /> Explore Public Subjects
                            </h2>

                            {/* Render Public Subjects */}
                            <RenderSubjectList
                                subjectHook={usePublicSubjects}
                            />
                        </section>
                    )}
                </main>
            </div>
        </>
    );
}
