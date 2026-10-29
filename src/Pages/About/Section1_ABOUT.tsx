import { NavLink } from 'react-router-dom';
import img from '../../assets/Side Image.png';

const Section1ABOUT = () => {
    return (
        <div className='max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'>
            <nav aria-label="Breadcrumb" className='pt-8 sm:pt-12 pb-8 sm:pb-10 animate-fade-in-up'>
                <ol className='flex items-center gap-2 text-sm'>
                    <li>
                        <NavLink to="/" className='text-neutral-500 hover:text-black transition-all duration-150 hover:-translate-y-0.5 inline-block'>Home</NavLink>
                    </li>
                    <li className='text-neutral-400 select-none'>/</li>
                    <li>
                        <NavLink to="/about" className='text-black font-medium inline-block'>About</NavLink>
                    </li>
                </ol>
            </nav>

            <section className='flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 pb-16 sm:pb-24'>
                <aside className='w-full lg:max-w-[530px] flex flex-col gap-6 sm:gap-8 animate-fade-in-up-delay-1'>
                    <h1 className='text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-normal text-black leading-tight'>Our Story</h1>
                    <div className='flex flex-col gap-4 sm:gap-6 text-sm sm:text-base text-neutral-800 leading-relaxed'>
                        <p>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.</p>
                        <p>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.</p>
                    </div>
                </aside>

                <div className='w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in-up-delay-2'>
                    <img src={img} alt="Our Story - Exclusive Shopping" className='w-full max-h-[500px] lg:max-h-[600px] object-cover rounded-md shadow-sm animate-float transition-transform duration-300 ease-out hover:-translate-y-2 cursor-pointer'/>
                </div>
            </section>
        </div>
    );
};

export default Section1ABOUT;
