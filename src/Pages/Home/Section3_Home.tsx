import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { 
    Smartphone, 
    Monitor, 
    Watch, 
    Camera, 
    Headphones, 
    Gamepad2, 
    Shirt, 
    Sparkles, 
    Tv, 
    Home as HomeIcon, 
    Pill, 
    Dumbbell, 
    Baby, 
    ShoppingBag, 
    Car, 
    ArrowLeft, 
    ArrowRight 
} from 'lucide-react';
import 'swiper/css';

// All categories from backend except the last test one ('еуые')
const CATEGORIES = [
    { id: 54, name: 'Phones', icon: Smartphone },
    { id: 22, name: 'Computers', icon: Monitor },
    { id: 21, name: 'SmartWatch', icon: Watch },
    { id: 4, name: 'Camera', icon: Camera },
    { id: 70, name: 'HeadPhones', icon: Headphones },
    { id: 23, name: 'Gaming', icon: Gamepad2 },
    { id: 68, name: "Woman's Fashion", icon: ShoppingBag },
    { id: 88, name: "Men's Fashion", icon: Shirt },
    { id: 71, name: 'Electronic', icon: Tv },
    { id: 89, name: 'Home & Lifestyle', icon: HomeIcon },
    { id: 41, name: 'Medicine', icon: Pill },
    { id: 90, name: 'Sports & Outdoor', icon: Dumbbell },
    { id: 43, name: 'Baby’s & Toys', icon: Baby },
    { id: 92, name: 'Health & Beauty', icon: Sparkles },
    { id: 30, name: 'Cars', icon: Car },
];

const Section3Home = () => {
    const [swiperRef, setSwiperRef] = useState<any>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14">
            {/* Red Badge */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded-sm" />
                <span className="text-[#DB4444] font-semibold text-sm sm:text-base">Categories</span>
            </div>

            {/* Header with Title and Navigation Arrows */}
            <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-semibold text-black tracking-tight">Browse By Category</h2>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button type="button" onClick={() => swiperRef?.slidePrev()}className="size-10 sm:size-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black transition-colors cursor-pointer"aria-label="Previous">
                        <ArrowLeft className="size-4 sm:size-5" />
                    </button>
                    <button type="button" onClick={() => swiperRef?.slideNext()}className="size-10 sm:size-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black transition-colors cursor-pointer"aria-label="Next">
                        <ArrowRight className="size-4 sm:size-5" />
                    </button>
                </div>
            </div>

            {/* Categories Swiper Slider */}
            <Swiper onSwiper={setSwiperRef} slidesPerView={2} spaceBetween={16}
                breakpoints={{
                    480: { slidesPerView: 3, spaceBetween: 16 },
                    768: { slidesPerView: 4, spaceBetween: 24 },
                    1024: { slidesPerView: 6, spaceBetween: 30 }
                }} className="w-full">
                {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedId === cat.id;

                    return (
                        <SwiperSlide key={cat.id}>
                            <div onClick={() => setSelectedId(selectedId === cat.id ? null : cat.id)}className={`h-[145px] rounded border flex flex-col items-center justify-center gap-3.5 cursor-pointer transition-colors duration-150 select-none hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white ${isSelected ? 'bg-[#DB4444] border-[#DB4444] text-white shadow-md' : 'bg-white border-neutral-300 text-black'}`}>
                                <Icon className="size-10 sm:size-12 stroke-[1.4]" />
                                <span className="text-sm sm:text-base font-normal tracking-wide text-center px-2 truncate w-full">
                                    {cat.name}
                                </span>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Bottom Separator Line */}
            <div className="border-b border-neutral-200 mt-12 sm:mt-16" />
        </section>
    );
};

export default Section3Home;
