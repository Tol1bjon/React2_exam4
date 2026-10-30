import { AccountSchema, type AccountForm } from '@/Schema/Scema';
import { EditProfil } from '@/Store/RTK';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { AppDispatch } from '@/Store/Store';

const Account = () => {
    const { user } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    const { register, handleSubmit, reset } = useForm<AccountForm>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
            firstName: user?.name,
            lastName: user?.lastName,
            email: user?.email,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            address: user?.address
        }
    })

    useEffect(() => {
        if(user){
            reset({
                firstName: user?.name,
                lastName: user?.lastName,
                email: user?.email,
                address: user?.address,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            })
        }
    }, [user, reset])

    const Onsubmit = async(data: AccountForm) => {
        const res: any = await dispatch(EditProfil(data))

        if(EditProfil.fulfilled.match(res)){
            alert("Account has been updated successfully!")
        } else {
            alert("Failed to update account!")
        }
    }

    return (
        <main className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14 animate-fade-in">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-10 sm:mb-16">
                <NavLink to="/" className="hover:text-black transition-colors">Home</NavLink>
                <span>/</span>
                <span className="text-black font-medium">My Account</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
                {/* Left Sidebar Navigation */}
                <aside className="flex flex-col gap-6 text-sm">
                    <div>
                        <h3 className="font-semibold text-black mb-3 text-base">Manage My Account</h3>
                        <ul className="flex flex-col gap-2 pl-4">
                            <li>
                                <NavLink to="/account" className="text-[#DB4444] font-medium transition-colors">My Profile</NavLink>
                            </li>
                            <li>
                                <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">Address Book</span>
                            </li>
                            <li>
                                <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">My Payment Options</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-black mb-3 text-base">My Orders</h3>
                        <ul className="flex flex-col gap-2 pl-4">
                            <li>
                                <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">My Returns</span>
                            </li>
                            <li>
                                <span className="text-neutral-500 hover:text-black cursor-pointer transition-colors">My Cancellations</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-black text-base cursor-pointer hover:text-[#DB4444] transition-colors">My WishList</h3>
                    </div>
                </aside>

                {/* Right Form Card */}
                <section className="bg-white rounded-lg shadow-[0_1px_13px_rgba(0,0,0,0.06)] border border-neutral-100 p-6 sm:p-10 lg:p-14">
                    <h2 className="text-xl font-medium text-[#DB4444] mb-6">Profile</h2>

                    <form onSubmit={handleSubmit(Onsubmit)} className="flex flex-col gap-6">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                            <div className="relative">
                                <span className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-neutral-500">First name</span>
                                <input {...register("firstName")} type="text" placeholder="Md" className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" />
                            </div>

                            <div className="relative">
                                <span className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-neutral-500">Last name</span>
                                <input {...register("lastName")} type="text" placeholder="Rimel" className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" />
                            </div>
                        </div>

                        {/* Email & Address Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                            <div className="relative">
                                <span className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-neutral-500">Email address</span>
                                <input {...register("email")} type="email" placeholder="rimel1111@gmail.com" className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" />
                            </div>

                            <div className="relative">
                                <span className="absolute -top-2.5 left-3 bg-white px-1.5 text-xs text-neutral-500">Street address</span>
                                <input {...register("address")} type="text" placeholder="Kingston, 5236, United State" className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-transparent" />
                            </div>
                        </div>

                        {/* Password Changes Section */}
                        <div className="flex flex-col gap-4 mt-2">
                            <h3 className="text-sm sm:text-base font-normal text-black">Password Changes</h3>

                            <input {...register("currentPassword")} type="password" placeholder="Current passwod" className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors bg-transparent"/>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                <input {...register("newPassword")} type="password"placeholder="New passwod"className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors bg-transparent"/>
                                <input {...register("confirmNewPassword")} type="password"placeholder="Confirm new passwod"className="w-full border border-neutral-300 rounded px-4 py-3 text-sm outline-none placeholder:text-neutral-500 focus:border-black transition-colors bg-transparent"/>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 sm:gap-6 mt-4">
                            <NavLink to={'/'}>
                                <button type="button" className="text-sm font-medium text-black hover:text-[#DB4444] transition-colors cursor-pointer py-2 px-4">Cancel</button>
                            </NavLink>
                            <button type="submit" className="w-full sm:w-auto bg-[#DB4444] text-white font-medium py-3.5 px-10 rounded text-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm">Save Changes</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default Account;
