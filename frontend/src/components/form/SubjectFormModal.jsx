import toast from 'react-hot-toast';
import { useSubjectForm } from '../../hooks/UseSubjectForm.jsx';
import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { useEffect } from 'react';

export default function SubjectFormModal({
    isOpen,
    onClose,
    setSubjectCreatingQueue,
}) {
    const { form, mutation } = useSubjectForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = form;

    const onSubmit = async (data) => {
        try {
            onClose();
            setSubjectCreatingQueue((prev) => prev + 1);
            await mutation.mutateAsync({ title: data.title });
            reset();
        } catch (err) {
            // Handle error silently
        } finally {
            setSubjectCreatingQueue((prev) => prev - 1);
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
                    Add New Subject
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Subject Title */}
                    <FormInput
                        label="Subject Title"
                        type="text"
                        name="title"
                        placeholder="Enter subject title..."
                        register={register}
                        errors={errors}
                    />

                    {/* Submit */}
                    <Button
                        type="submit"
                        name="Add Subject"
                        bgColor="#16a34a"
                        color="white"
                        borderRadius="8px"
                        height="45px"
                    />
                </form>
            </div>
        </div>
    );
}
