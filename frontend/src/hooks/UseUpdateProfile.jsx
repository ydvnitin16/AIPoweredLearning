import { putRequest } from '../services/apis';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import {UseAuthStore} from '../stores/UseAuthStore.jsx';

const userProfileSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),

    bio: yup.string().max(200, 'Bio must be at most 200 characters').nullable(),

    additionalInfo: yup
        .string()
        .max(200, 'Additional info must be at most 200 characters')
        .nullable(),
});

export const useUpdateProfile = () => {
    const setUserStore = UseAuthStore((s) => s.setUserStore);
    const form = useForm({
        resolver: yupResolver(userProfileSchema),
    });

    const onSubmit = async (data) => {
        try {
            const resData = await putRequest(`${import.meta.env.VITE_SERVER_URL}/update-profile`, data);
            setUserStore(resData.user);
            toast.success(resData.message);
        } catch (err) {
            toast.error(err.message)
        }
    };

    return { form, onSubmit };
};
