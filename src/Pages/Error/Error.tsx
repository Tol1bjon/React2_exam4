import { NavLink } from 'react-router-dom';
import { Cog } from 'lucide-react';

const Error = () => {
    return (
        <main className='min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 gap-6'>
            {/* Контейнер двух сцепленных шестеренок */}
            <div className='relative w-[275px] h-[275px] sm:w-[319px] sm:h-[319px] select-none'>
                {/* Большая шестеренка (12 зубьев, 12 секунд = 1 зуб в секунду) */}
                <Cog strokeWidth={1.75} className='absolute top-0 left-0 size-48 sm:size-56 text-neutral-800 animate-spin [animation-duration:12s]'/>

                {/* Меньшая шестеренка (сдвиг -0.5s из 12s поворачивает её ровно на 15° — полшага зуба!) */}
                <Cog strokeWidth={1.75} className='absolute top-[123px] left-[123px] sm:top-[143px] sm:left-[143px] size-36 sm:size-44 text-[#DB4444] animate-spin [animation-duration:12s] [animation-direction:reverse] [animation-delay:-0.5s]'/>
            </div>

            <div className='flex flex-col gap-2 max-w-md'>
                <h1 className='text-3xl sm:text-4xl font-semibold text-neutral-900'>Something went wrong</h1>
                <p className='text-sm sm:text-base text-neutral-600'>An unexpected error occurred. We are working on fixing it.</p>
            </div>

            <NavLink to='/' className='bg-[#DB4444] text-white font-medium text-sm sm:text-base px-8 py-3.5 rounded transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 inline-block shadow-sm'>Back to home page</NavLink>
        </main>
    );
};

export default Error;