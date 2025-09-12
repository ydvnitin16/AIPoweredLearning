import Button from '../common/Button.jsx';
import FormInput from '../common/FormInput.jsx';
import { UseAuthStore } from '../../stores/UseAuthStore.jsx';
import { useUpdateProfile } from '../../hooks/UseUpdateProfile.jsx';

const UpdateProfileModal = ({ isOpen, onClose }) => {
    const userStore = UseAuthStore((s) => s.userStore);

    const { form, onSubmit } = useUpdateProfile();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    if (!isOpen) return null;

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
