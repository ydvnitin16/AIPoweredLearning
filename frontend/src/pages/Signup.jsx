import React, { useState } from 'react';
import sideImage from '../assets/AiPoweredImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/common/Loading.jsx';
import FormInput from '../components/common/FormInput.jsx';
import Button from '../components/common/Button.jsx';
import { authUser } from '../services/auth.js';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Validation schema
    const schema = yup.object({
        name: yup
            .string()
            .min(2, 'Name must be at least 2 characters')
            .required('Name is required'),
        email: yup
            .string()
            .trim()
            .email('Invalid email format')
            .required('Email is required.'),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        terms: yup.boolean().oneOf([true]),
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Form submission
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await authUser('register', data);
            const resData = await res.json();

            if (!res.ok) {
                toast.error(resData.message);
                return;
            }

            toast.success(resData.message);
            reset();
            navigate('/login');
            toast('Please login here');
        } catch (error) {
            toast.error(error.message || 'Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading fullscreen={true} />}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
                <div className="flex flex-col md:flex-row w-full dark:bg-zinc-700 max-w-5xl bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Left: Register Form */}
                    <div className="w-full md:w-1/2 p-8 dark:bg-zinc-700 sm:p-10">
                        <h2 className="text-2xl font-bold dark:text-white text-gray-800 mb-6">
                            Register Now
                        </h2>

                        {/* ✅ Wrap inputs in a form */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name */}
                            <FormInput
                                label="Name"
                                placeholder="Enter Name"
                                type="text"
                                register={register}
                                errors={errors}
                                name="name"
                                icon={<FontAwesomeIcon icon={faUser} />}
                            />

                            {/* Email */}
                            <FormInput
                                label="Email"
                                placeholder="Enter Email"
                                type="text"
                                register={register}
                                errors={errors}
                                name="email"
                                icon={<FontAwesomeIcon icon={faEnvelope} />}
                            />

                            {/* Password */}
                            <FormInput
                                label="Password"
                                placeholder="Enter Password"
                                type="password"
                                register={register}
                                errors={errors}
                                name="password"
                            />

                            {/* Terms Checkbox */}
                            <div className="flex items-center mb-6 text-sm">
                                <input
                                    type="checkbox"
                                    {...register('terms')}
                                    className="mr-2 cursor-pointer"
                                    required
                                />
                                <span className="dark:text-white">
                                    I accept the{' '}
                                    <Link
                                        to="/login"
                                        className="text-blue-600 font-medium"
                                    >
                                        Terms And Conditions
                                    </Link>
                                </span>
                            </div>

                            {/* Register Button */}
                            <Button
                                type="submit"
                                name="Sign Up"
                                bgColor="#0F172A"
                                color="#ffffff"
                                borderRadius="7px"
                            />
                        </form>

                        {/* Login Redirect */}
                        <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-300">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-blue-600 font-medium"
                            >
                                Login Here
                            </Link>
                        </p>
                    </div>

                    {/* Right: Banner Section */}
                    <div
                        className="hidden md:flex md:w-1/2  dark:bg-zinc-700 bg-cover bg-center text-white p-10 flex-col justify-center rounded-l-xl"
                        style={{
                            backgroundImage: `url(${sideImage})`,
                        }}
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Join Us Today
                        </h2>
                        <p className="text-sm mb-4">
                            Create your free account and unlock access to
                            powerful tools, personalized features, and exclusive
                            content.
                        </p>
                        <p className="text-sm">
                            Sign up now and take the first step toward your next
                            big opportunity.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
