import { GetCategories, GetProducts } from '@/Store/RTK';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight, ArrowRight, Search } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

const AppleIcon = () => (
    <svg className="size-8 sm:size-10 fill-current text-white shrink-0" viewBox="0 0 170 170">
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.74-11.97-14.1-6.19-9.24-11-20.08-14.42-32.53-3.43-12.45-5.14-24.16-5.14-35.13 0-14.24 3.59-25.79 10.77-34.66 7.18-8.87 16.2-13.37 27.06-13.5 4.35 0 9.4 1.13 15.17 3.38 5.76 2.26 9.8 3.44 12.11 3.55 2.12-.11 6.35-1.34 12.69-3.69 6.33-2.34 11.59-3.4 15.77-3.17 12.02.54 21.6 4.78 28.75 12.74-10.65 6.42-15.86 15.24-15.63 26.44.22 8.92 3.65 16.32 10.3 22.21 6.64 5.88 14.52 9.25 23.63 10.12-2.18 6.74-4.79 13.5-7.83 20.29zM119.22 31.84c0-7.07 2.56-13.71 7.69-19.92 5.13-6.2 11.43-10.17 18.9-11.92.22 1.3.33 2.5.33 3.59 0 7.07-2.61 13.6-7.83 19.6-5.22 6-11.64 9.88-19.26 11.64.05-1.09.17-2.09.17-2.99z" />
    </svg>
);

const Section1HOME = () => {
    const dispatch = useDispatch()
    const { categories, products } = useSelector((state: any) => state.auth)

    useEffect(() => {
        dispatch(GetProducts())
        dispatch(GetCategories())
    }, [dispatch])

    return (
        <section className="max-w-[1240px] mx-auto px-4 pb-14 pt-4">
            {/* Mobile Search & Categories */}
            <div className="lg:hidden flex flex-col gap-4 mb-6">
                <div className="relative">
                    <input type="text" placeholder="Search" className="w-full bg-neutral-100 rounded-md py-2.5 pl-4 pr-10 text-sm outline-none"/>
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories?.slice(0, 10).map((cat: any) => (
                        <div key={cat.id} className="bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded text-xs font-medium text-neutral-800 flex items-center gap-1 cursor-pointer transition-colors">
                            <span>{cat.categoryName}</span>
                            {cat.subCategories?.length > 0 && <ChevronRight className="size-3 text-neutral-500" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
                {/* Desktop Left Categories List */}
                <aside className="hidden lg:flex flex-col gap-3 min-w-[220px] max-w-[240px] pr-6 border-r border-neutral-200 text-sm font-normal text-black pt-4 shrink-0">
                    {categories?.slice(0, 9).map((cat: any) => (
                        <div key={cat.id} className="flex items-center justify-between hover:text-[#DB4444] cursor-pointer transition-colors group py-1">
                            <span className="truncate">{cat.categoryName}</span>
                            {cat.subCategories?.length > 0 && (
                                <ChevronRight className="size-4 text-neutral-400 group-hover:text-[#DB4444] transition-colors shrink-0" />
                            )}
                        </div>
                    ))}
                </aside>

                {/* Right Hero Swiper Banner */}
                <div className="flex-1 bg-black text-white relative overflow-hidden min-h-[340px] sm:min-h-[380px] flex items-center">
                    <Swiper modules={[Pagination, Autoplay]} pagination={{ clickable: true }} autoplay={{ delay: 4000, disableOnInteraction: false }} loop={products?.length > 1} className="w-full h-full pb-10">
                        {products?.map((item: any) => (
                            <SwiperSlide key={item.id}>
                                <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 py-4 sm:px-10 sm:py-6 lg:px-12 lg:py-6 pb-12 gap-6 w-full">
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 max-w-md">
                                        {/* Brand / Category */}
                                        <div className="flex items-center gap-2">
                                            {item.brand?.toLowerCase().includes('apple') ? (
                                                <AppleIcon />
                                            ) : (
                                                <span className="size-2 rounded-full bg-[#DB4444]" />
                                            )}
                                            <span className="text-xs sm:text-sm text-neutral-300 font-medium tracking-wide uppercase">
                                                {item.brand || item.categoryName}
                                            </span>
                                        </div>

                                        {/* Real Product Name */}
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight line-clamp-2">
                                            {item.productName}
                                        </h2>

                                        {/* Price & Discount */}
                                        <div className="flex items-center gap-3">
                                            {item.hasDiscount ? (
                                                <>
                                                    <span className="text-xl sm:text-2xl font-bold text-white">${item.discountPrice}</span>
                                                    <span className="text-sm sm:text-base text-neutral-400 line-through">${item.price}</span>
                                                    <span className="text-xs bg-[#DB4444] text-white px-2 py-0.5 rounded font-medium">
                                                        -{Math.round((1 - item.discountPrice / item.price) * 100)}%
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xl sm:text-2xl font-bold text-white">${item.price}</span>
                                            )}
                                        </div>

                                        {/* Shop Now Link */}
                                        <NavLink to={`/product/${item.id}`} className="inline-flex items-center gap-2 underline underline-offset-8 font-medium text-sm sm:text-base hover:text-neutral-300 transition-colors mt-2">
                                            <span>Shop Now</span>
                                            <ArrowRight className="size-4" />
                                        </NavLink>
                                    </div>

                                    {/* Product Image (Larger within box) */}
                                    <div className="flex justify-center items-center h-[240px] sm:h-[300px] md:h-[330px] w-full md:w-1/2 p-1">
                                        <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="h-full w-auto max-w-full object-contain filter drop-shadow-[0_10px_25px_rgba(255,255,255,0.07)]"/>
                                     </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Pagination Bullet Styling */}
            <style>{`
                .swiper-pagination-bullet {
                    background: #808080 !important;
                    opacity: 0.6;
                    width: 10px;
                    height: 10px;
                }
                .swiper-pagination-bullet-active {
                    background: #DB4444 !important;
                    opacity: 1;
                    border: 2px solid #ffffff;
                }
            `}</style>

        </section>
    );
}

export default Section1HOME;
