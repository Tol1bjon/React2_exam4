import { RegisterSchema, type RegisterForm } from '@/Schema/Scema';
import { GoogleAuthUser, RegisterUser } from '@/Store/RTK';
import { GoogleLogin } from '@react-oauth/google';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

const GoogleIcon = ({ className = 'size-5' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
);

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } }: any = useForm({
        resolver: zodResolver(RegisterSchema)
    })

    const Onsubmit = async(data: RegisterForm) => {
        const res: any = await dispatch(RegisterUser(data))
        if(RegisterUser.fulfilled.match(res)) {
            reset()
            navigate("/")
        }
    }

    return (
        <main className='min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 animate-fade-in-up'>
            <div className='w-full max-w-[370px] flex flex-col'>
                <h1 className='text-3xl sm:text-4xl font-medium tracking-normal text-black mb-3'>Create an account</h1>
                <p className='text-sm sm:text-base text-neutral-800 font-normal mb-8'>Enter your details below</p>

                <form onSubmit={handleSubmit(Onsubmit)} className='flex flex-col gap-4 w-full'>
                    <input {...register("userName")} type="text" placeholder="Name" className='w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors' />
                    <input {...register("email")} type="text" placeholder="Email or phone number" className='w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors' />
                    <input {...register("password")} type="password" placeholder="Password" className='w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors' />
                    <button type="submit" className='w-full bg-[#DB4444] text-white font-medium py-3.5 rounded text-sm sm:text-base mt-2 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm'>Create Account</button>
                    <div className='w-full flex justify-center'>
                        <GoogleLogin
                            onSuccess={async (info) => {
                                if (info.credential) {
                                    const res: any = await dispatch(GoogleAuthUser(info.credential));
                                    if (GoogleAuthUser.fulfilled.match(res)) {
                                        navigate("/");
                                    }
                                }
                            }}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                            text="signup_with"
                            shape="rectangular"
                            width="370"
                        />
                    </div>
                </form>

                <p className='text-sm text-neutral-600 text-center mt-8'>
                    Already have account?{' '}
                    <NavLink to="/login" className='text-black font-medium underline underline-offset-4 hover:text-[#DB4444] transition-colors ml-1'>Log in</NavLink>
                </p>
            </div>
        </main>
    );
};

export default Register;