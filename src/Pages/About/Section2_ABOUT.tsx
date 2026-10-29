import { Store, CircleDollarSign, ShoppingBag } from 'lucide-react';

const MoneyBagIcon = ({ className = 'size-7' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M9 4h6l1.5 3H7.5L9 4z" />
        <path d="M5 11c0-2.5 2.5-4 7-4s7 1.5 7 4c0 5-2.5 9-7 9s-7-4-7-9z" />
        <path d="M12 11.5v5" />
        <path d="M10.5 12.5h2.2a1 1 0 0 1 0 2h-1.4a1 1 0 0 0 0 2h2.2" />
    </svg>
);

const stats = [
    {
        id: 1,
        icon: Store,
        value: '10.5k',
        label: 'Sallers active our site',
        animationClass: 'animate-fade-in-up',
    },
    {
        id: 2,
        icon: CircleDollarSign,
        value: '33k',
        label: 'Mopnthly Produduct Sale',
        animationClass: 'animate-fade-in-up-delay-1',
    },
    {
        id: 3,
        icon: ShoppingBag,
        value: '45.5k',
        label: 'Customer active in our site',
        animationClass: 'animate-fade-in-up-delay-2',
    },
    {
        id: 4,
        icon: MoneyBagIcon,
        value: '25k',
        label: 'Anual gross sale in our site',
        animationClass: 'animate-fade-in-up-delay-3',
    },
];

const Section2ABOUT = () => {
    return (
        <section className='max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
                {stats.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <div key={item.id} className={`group relative flex flex-col items-center justify-center text-center py-8 px-6 rounded-md border border-neutral-300 bg-white transition-all duration-300 hover:bg-[#DB4444] hover:border-[#DB4444] hover:-translate-y-2 hover:shadow-xl cursor-pointer ${item.animationClass}`}>
                            <div className='size-20 rounded-full flex items-center justify-center bg-[#C1C0C1] group-hover:bg-white/30 transition-colors duration-300 mb-6'>
                                <div className='size-14 rounded-full flex items-center justify-center bg-black text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-sm'><IconComponent className='size-7' /></div>
                            </div>
                            <h3 className='text-3xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-300 mb-2'>{item.value}</h3>
                            <p className='text-sm text-neutral-800 group-hover:text-white transition-colors duration-300 leading-snug'>{item.label}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Section2ABOUT;
