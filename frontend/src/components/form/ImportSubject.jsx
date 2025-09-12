import Button from '../common/Button';
import { useImportSubjects } from '../../hooks/UseImportSubject';
import { useState } from 'react';

const ImportSubject = ({ isOpen, onClose, setSubjectImportingQueue }) => {
    const { mutation } = useImportSubjects();
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setSubjectImportingQueue((prev) => prev + 1);
            onClose();
            await mutation.mutateAsync({ id });
        } catch (err) {
            console.log(err);
        } finally {
            setSubjectImportingQueue((prev) => prev - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-md relative"
            >
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    Import Subject
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Subject Title */}
                    <input
                        type="text"
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Enter Document _id"
                        className={`w-full border-b py-2 pr-10 focus:outline-none  dark:text-white border-gray-300`}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        name="Import Subject"
                        bgColor="#16a34a"
                        color="white"
                        borderRadius="8px"
                        height="45px"
                    />
                </form>
            </div>
        </div>
    );
};

export default ImportSubject;
