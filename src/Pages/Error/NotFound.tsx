import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className='min-h-[65vh] flex flex-col items-center justify-center text-center px-4 py-16 sm:py-24 gap-6 sm:gap-8'>
            <h1 className='text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-medium tracking-normal text-black'>404 Not Found</h1>
            <p className='text-sm sm:text-base text-neutral-800'>Your visited page not found. You may go home page.</p>
            <NavLink to='/' className='bg-[#DB4444] text-white font-medium text-sm sm:text-base px-10 py-4 rounded transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 inline-block'>Back to home page</NavLink>
        </main>
    );
};

export default NotFound;