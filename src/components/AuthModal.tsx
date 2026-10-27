import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, X } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate('/login');
        onClose();
    };

    const handleRegister = () => {
        navigate('/register');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <dialog open={isOpen} onClick={onClose}className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 w-full h-full max-w-none max-h-none p-4 m-0 border-none'>
            <div onClick={(e) => e.stopPropagation()} className='relative w-full max-w-[390px] bg-white rounded-lg p-6 sm:p-8 flex flex-col items-center text-center shadow-lg'>
                <button type="button" onClick={onClose} className='absolute right-4 top-4 text-neutral-400 hover:text-black transition-colors cursor-pointer p-1' aria-label="Close modal">
                    <X className='size-5' />
                </button>

                <div className='size-14 rounded-full bg-red-50 text-[#DB4444] flex items-center justify-center mb-4'>
                    <Lock className='size-7' />
                </div>

                <h3 className='text-2xl font-medium text-black mb-2'>Authorization Required</h3>
                <p className='text-sm text-neutral-600 mb-6'>To view product details and complete purchases, please log in to your account or create a new one.</p>

                <div className='flex flex-col w-full gap-3'>
                    <button type="button" onClick={handleLogin} className='w-full bg-[#DB4444] text-white font-medium py-3 rounded text-sm sm:text-base transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm'>Log In</button>
                    <button type="button" onClick={handleRegister} className='w-full border border-neutral-300 rounded py-3 px-4 text-sm sm:text-base font-medium text-black bg-white hover:bg-neutral-50 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm'>Create Account</button>
                </div>
            </div>
        </dialog>
    );
};

export default AuthModal;
