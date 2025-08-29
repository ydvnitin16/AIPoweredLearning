import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { UseAuthStore } from '../../stores/UseAuthStore.jsx';
import { toast } from 'react-hot-toast';

const UpdateProfileModal = ({ isProfileOpen, onClose }) => {
    const userStore = UseAuthStore((s) => s.userStore);
    const setUserStore = UseAuthStore((s) => s.setUserStore);

    const userProfileSchema = yup.object({
        name: yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),

        bio: yup
            .string()
            .max(200, 'Bio must be at most 200 characters')
            .nullable(),

        additionalInfo: yup
            .string()
            .max(200, 'Additional info must be at most 200 characters')
            .nullable(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userProfileSchema),
    });

    if (!isProfileOpen) return null;

    const onSubmit = async (data) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/update-profile`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
            const resData = await res.json();
            console.log(resData)
            setUserStore(resData.user)
            onClose()
            toast.success(resData.message)
        } catch (err) {
            toast.error('Something Went Wrong!')
        }
    };

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-100 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-xl mx-auto backdrop-blur-sm dark:bg-zinc-800 bg-white shadow-lg rounded-xl p-6 space-y-4"
            >
                {/* Name */}
                <FormInput
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    value={userStore.name}
                    register={register}
                    errors={errors}
                />

                {/* Bio */}
                <FormInput
                    label="Bio"
                    name="bio"
                    placeholder="Eg: BCA Student, 12th with PCM"
                    value={userStore.bio}
                    register={register}
                    errors={errors}
                />

                {/* Additional Info */}
                <FormInput
                    label="Additional Info"
                    name="additionalInfo"
                    placeholder="Interests, Values, or Preferences to keep in mind"
                    value={userStore.additionalInfo}
                    register={register}
                    errors={errors}
                />

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    <Button
                        type="button"
                        onClick={onClose}
                        name="Cancel"
                        borderRadius="9999px"
                        bgColor="white"
                        color="black"
                        width="75px"
                    />
                    <Button
                        type="submit"
                        name="Save"
                        borderRadius="9999px"
                        bgColor="white"
                        color="black"
                        width="75px"
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileModal;
