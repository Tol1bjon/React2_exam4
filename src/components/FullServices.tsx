import { Truck, Headphones, ShieldCheck } from 'lucide-react';

const services = [
    {
        id: 1,
        icon: Truck,
        title: 'FREE AND FAST DELIVERY',
        description: 'Free delivery for all orders over $140',
        animationClass: 'animate-fade-in-up',
    },
    {
        id: 2,
        icon: Headphones,
        title: '24/7 CUSTOMER SERVICE',
        description: 'Friendly 24/7 customer support',
        animationClass: 'animate-fade-in-up-delay-1',
    },
    {
        id: 3,
        icon: ShieldCheck,
        title: 'MONEY BACK GUARANTEE',
        description: 'We reurn money within 30 days',
        animationClass: 'animate-fade-in-up-delay-2',
    },
];

const FullServices = () => {
    return (
        <section className='max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8'>
                {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                        <div key={service.id} className={`group flex flex-col items-center text-center transition-transform duration-300 ease-out hover:-translate-y-2 cursor-pointer ${service.animationClass}`}>
                            <div className='size-20 rounded-full flex items-center justify-center bg-[#C1C0C1] group-hover:bg-[#DB4444]/30 transition-colors duration-300'>
                                <div className='size-14 rounded-full flex items-center justify-center bg-black text-white group-hover:bg-[#DB4444] transition-colors duration-300 shadow-sm'>
                                    <IconComponent className='size-8' />
                                </div>
                            </div>
                            <h3 className='text-lg sm:text-xl font-bold uppercase tracking-wider text-black mt-6 mb-2'>{service.title}</h3>
                            <p className='text-sm text-neutral-600 font-normal leading-relaxed max-w-[260px]'>{service.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FullServices;
