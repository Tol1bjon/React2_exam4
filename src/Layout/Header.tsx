import React, { useState } from 'react';
import logo from '../assets/Group 1116606595.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { Heart, Search, ShoppingCart, Menu, User, ShoppingBag, LogOut } from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetClose,
} from '../components/ui/sheet';
import { useDispatch, useSelector } from 'react-redux';
import AuthModal from '@/components/AuthModal';
import { logout } from '@/Store/RTK';

const Header = () => {
    const [authOpen, setAuthOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { token } = useSelector((state: any) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        setMenuOpen(false)
        dispatch(logout())
        navigate('/register')
    }

    return (
        <header className='py-[16px] px-4 border-b border-[#E6E6E6]'>
            <div className='lg:max-w-[1300px] mx-auto'>
                {/* Mobile Header */}
                <div className='flex md:hidden items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Sheet>
                            <SheetTrigger className='p-1 outline-none cursor-pointer rounded-md hover:bg-neutral-100 flex items-center justify-center transition-transform duration-150 hover:translate-x-0.5 active:translate-x-0'>
                                <Menu className='size-6 text-black' />
                            </SheetTrigger>
                            <SheetContent side='left' className='h-full w-[70vw] max-w-[70vw] p-0 bg-white text-neutral-900 border-r border-neutral-200 flex flex-col justify-between z-50'>
                                <div>

                                    <div className='p-4 border-b border-neutral-200'>
                                        <img src={logo} alt="Logo" className='h-10 object-contain' />
                                    </div>

                                    <nav className='flex flex-col gap-1 p-3'>
                                        <SheetClose render={<NavLink to={'/'} className='block py-2.5 px-3 text-sm font-medium hover:bg-neutral-100 rounded-md transition-all duration-150 hover:translate-x-1 active:translate-x-0' />}>Home</SheetClose>
                                        <SheetClose render={<NavLink to={'/contact'} className='block py-2.5 px-3 text-sm font-medium hover:bg-neutral-100 rounded-md transition-all duration-150 hover:translate-x-1 active:translate-x-0' />}>Contact</SheetClose>
                                        <SheetClose render={<NavLink to={'/about'} className='block py-2.5 px-3 text-sm font-medium hover:bg-neutral-100 rounded-md transition-all duration-150 hover:translate-x-1 active:translate-x-0' />}>About</SheetClose>
                                    </nav>
                                </div>

                                <div className='p-3 border-t border-neutral-200'>
                                    <SheetClose render={<NavLink to={'/register'} className='flex items-center gap-2.5 py-2.5 px-3 text-sm font-medium hover:bg-neutral-100 rounded-md transition-all duration-150 hover:translate-x-1 active:translate-x-0' />}>
                                        <User className='size-5 text-neutral-700' />
                                        <span>Sign Up</span>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <span className='text-xl font-bold tracking-wider text-black'>Exclusive</span>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className='relative cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'>
                            <ShoppingCart className='size-6 text-black' />
                        </div>
                        <div className='relative'>
                            {token ? (
                                <div onClick={() => setMenuOpen(!menuOpen)} className='p-[4px] bg-[#DB4444] text-white rounded-full cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'>
                                    <User className='size-6' />
                                </div>
                            ) : (
                                <User onClick={() => setAuthOpen(true)} className='size-6 cursor-pointer text-black transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0' />
                            )}

                            {token && menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2.5 w-48 rounded-md bg-black/80 backdrop-blur-md text-white p-3 shadow-2xl z-50 flex flex-col gap-1 animate-fade-in">
                                        <NavLink to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                            <User className="size-5" />
                                            <span>Account</span>
                                        </NavLink>
                                    <NavLink to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                        <ShoppingBag className="size-5" />
                                        <span>My Order</span>
                                    </NavLink>
                                    <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                        <Heart className="size-5" />
                                        <span>Wishlist</span>
                                    </NavLink>
                                        <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors cursor-pointer text-left w-full">
                                            <LogOut className="size-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Header */}
                <div className='hidden md:flex items-center justify-between'>
                    <NavLink to={'/'} className='transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'>
                        <img src={logo} alt="Logo" className='h-12 object-contain' />
                    </NavLink>

                    <nav className='flex items-center gap-[40px] text-black text-sm font-medium'>
                        <NavLink to={'/'} className={({ isActive }) => `transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${isActive ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}>Home</NavLink>
                        <NavLink to={'/contact'} className={({ isActive }) => `transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${isActive ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}>Contact</NavLink>
                        <NavLink to={'/about'} className={({ isActive }) => `transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${isActive ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}>About</NavLink>
                        <NavLink to={'/register'} className={({ isActive }) => `transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 ${isActive ? 'underline underline-offset-4' : 'hover:underline underline-offset-4'}`}>Sign Up</NavLink>
                    </nav>

                    <aside className='flex items-center gap-[20px]'>
                        <div className='flex items-center gap-[10px] bg-[#F5F5F5] py-[7px] px-[16px] rounded-lg text-sm w-[240px]'>
                            <input className='w-full bg-transparent outline-none text-xs placeholder:text-neutral-500' type="text" placeholder='What are you looking for?' />
                            <Search className='size-4 shrink-0 text-neutral-700' />
                        </div>
                        <Heart className='size-6 cursor-pointer text-black transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0' />
                        <div className='relative cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'>
                            <ShoppingCart className='size-6 text-black' />
                        </div>
                        <div className='relative'>
                            {token ? (
                                <div onClick={() => setMenuOpen(!menuOpen)} className='p-[4px] bg-[#DB4444] text-white rounded-full cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'>
                                    <User className='size-6' />
                                </div>
                            ) : (
                                <User onClick={() => setAuthOpen(true)} className='size-6 cursor-pointer text-black transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0' />
                            )}

                            {token && menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2.5 w-48 rounded-md bg-black/80 backdrop-blur-md text-white p-3 shadow-2xl z-50 flex flex-col gap-1 animate-fade-in">
                                        <NavLink to="/account" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                            <User className="size-5" />
                                            <span>Account</span>
                                        </NavLink>
                                    <NavLink to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                        <ShoppingBag className="size-5" />
                                        <span>My Order</span>
                                    </NavLink>
                                    <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors">
                                        <Heart className="size-5" />
                                        <span>Wishlist</span>
                                    </NavLink>
                                        <button type="button" onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors cursor-pointer text-left w-full">
                                            <LogOut className="size-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </header>
    );
}

export default Header;






