import { NavLink } from 'react-router-dom';
import ps5 from '../../assets/ps5-slim-goedkope-playstation_large 1.png';
import women from '../../assets/attractive-woman-wearing-hat-posing-black-background 1.png';
import speaker from '../../assets/Frame 707.png';
import perfume from '../../assets/Frame 706.png';

const Section7HOME = () => {
    return (
        <section className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded-sm" />
                <span className="text-[#DB4444] font-semibold text-sm sm:text-base">Featured</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold text-black tracking-tight mb-6 sm:mb-8">
                New Arrival
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 sm:gap-5">
                <article className="relative min-h-[300px] sm:min-h-[400px] bg-black rounded overflow-hidden md:row-span-2 group">
                    <img src={ps5} alt="PlayStation 5" className="absolute inset-0 w-full h-full object-contain object-right-bottom transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6 text-white max-w-[250px]">
                        <h3 className="text-xl font-medium mb-1">PlayStation 5</h3>
                        <p className="text-xs sm:text-sm mb-2">Black and White version of the PS5 coming out on sale.</p>
                        <NavLink to="/" className="text-sm underline underline-offset-4 hover:text-neutral-300">Shop Now</NavLink>
                    </div>
                </article>

                <article className="relative min-h-[210px] sm:min-h-[190px] bg-black rounded overflow-hidden group">
                    <img src={women} alt="Women's collection" className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                    <div className="absolute left-5 bottom-5 sm:left-6 sm:bottom-6 text-white max-w-[220px]">
                        <h3 className="text-xl font-medium mb-1">Women’s Collections</h3>
                        <p className="text-xs sm:text-sm mb-2">Featured woman collections that give you another vibe.</p>
                        <NavLink to="/" className="text-sm underline underline-offset-4 hover:text-neutral-300">Shop Now</NavLink>
                    </div>
                </article>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:min-h-[190px]">
                    <article className="relative min-h-[190px] bg-neutral-900 rounded overflow-hidden group">
                        <img src={speaker} alt="Amazon wireless speakers" className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute left-4 bottom-4 text-white">
                            <h3 className="text-lg sm:text-xl font-medium mb-1">Speakers</h3>
                            <p className="text-[11px] sm:text-xs mb-1.5">Amazon wireless speakers</p>
                            <NavLink to="/" className="text-xs sm:text-sm underline underline-offset-4 hover:text-neutral-300">Shop Now</NavLink>
                        </div>
                    </article>

                    <article className="relative min-h-[190px] bg-neutral-900 rounded overflow-hidden group">
                        <img src={perfume} alt="Gucci perfume" className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute left-4 bottom-4 text-white">
                            <h3 className="text-lg sm:text-xl font-medium mb-1">Perfume</h3>
                            <p className="text-[11px] sm:text-xs mb-1.5">GUCCI INTENSE OUD EDP</p>
                            <NavLink to="/" className="text-xs sm:text-sm underline underline-offset-4 hover:text-neutral-300">Shop Now</NavLink>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}

export default Section7HOME;
