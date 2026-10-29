import { RegisterSchema, type RegisterForm } from '@/Schema/Scema';
import { GoogleAuthUser, RegisterUser } from '@/Store/RTK';
import { GoogleLogin } from '@react-oauth/google';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import type { AppDispatch } from '@/Store/Store';

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { register, handleSubmit, reset }: any = useForm({
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