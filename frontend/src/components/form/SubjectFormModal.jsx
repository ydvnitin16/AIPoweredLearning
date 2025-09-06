// src/components/modals/SubjectFormModal.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// ---------------- Schema Validation ----------------
const schema = yup.object({
    title: yup.string().min(2, 'Subject title must be at least 2 characters'),
});

export default function SubjectFormModal({ isOpen, onClose, setIsCreating }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subjectTitle: '',
        },
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => {
            setIsCreating(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/subjects`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subjects'] });
            setIsCreating(false)
        },
    });

    const onSubmit = async (data) => {
        onClose(); // close modal
        const res = await mutation.mutateAsync({ title: data.title });
        if(!res.ok){
            return console.log('Subject Not Added.')
        }
        const resData = await res.json();
        console.log(resData.message);
        reset(); // clear form
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
