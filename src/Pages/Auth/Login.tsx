import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { LoginSchema, type LoginForm } from '@/Schema/Scema';
import { LoginUser } from '@/Store/RTK';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch } from '@/Store/Store';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, reset } = useForm<LoginForm>({
        resolver: zodResolver(LoginSchema)
    })

    const Onsubmit = async(data: LoginForm) => {
        const res: any = await dispatch(LoginUser(data))
        if(LoginUser.fulfilled.match(res)){
            reset()
            navigate("/")
        }
    }

    return (
        <main className='min-h-[75vh] flex items-center justify-center px-4 py-16 sm:py-24 animate-fade-in-up'>
            <div className='w-full max-w-[370px] flex flex-col'>
                <h1 className='text-3xl sm:text-4xl font-medium tracking-normal text-black mb-3'>Log in to Exclusive</h1>
                <p className='text-sm sm:text-base text-neutral-800 font-normal mb-8'>Enter your details below</p>

                <form onSubmit={handleSubmit(Onsubmit)} className='flex flex-col gap-6 w-full'>
                    <div className='relative w-full'>
                        <input {...register("userName")} id="emailOrPhone" type="text" placeholder=" " className='peer w-full border border-neutral-300 rounded px-4 py-3.5 text-sm outline-none focus:border-black transition-colors bg-transparent'/>
                        <label htmlFor="emailOrPhone" className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1.5 text-sm text-neutral-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs'>Email or phone number</label>
                    </div>
                    <div className='relative w-full'>
                        <input {...register("password")} id="password" type={showPassword ? 'text' : 'password'} placeholder=" " className='peer w-full border border-neutral-300 rounded px-4 py-3.5 pr-11 text-sm outline-none focus:border-black transition-colors bg-transparent'/>
                        <label htmlFor="password" className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1.5 text-sm text-neutral-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-neutral-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs'>Password</label>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black transition-colors cursor-pointer' aria-label="Toggle password visibility">
                            {showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
                        </button>
                    </div>
                    <div className='text-center -mt-1 mb-1'>
                        <NavLink to="#" className='text-sm font-medium text-[#DB4444] hover:underline transition-colors inline-block'>Forget Password?</NavLink>
                    </div>
                    <button type="submit" className='w-full bg-[#DB4444] text-white font-medium py-3.5 rounded text-sm sm:text-base transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm'>Log In</button>
                </form>
            </div>
        </main>
    );
};

export default Login;
