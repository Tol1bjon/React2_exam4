import { GetCategories, GetProducts } from '@/Store/RTK';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight, ArrowRight, Search } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

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
                        <NavLink to={`/all-product?category=${cat.id}`} key={cat.id} className="bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2 rounded text-xs font-medium text-neutral-800 flex items-center gap-1 cursor-pointer transition-colors">
                            <span>{cat.categoryName}</span>
                            {cat.subCategories?.length > 0 && <ChevronRight className="size-3 text-neutral-500" />}
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
                {/* Desktop Left Categories List */}
                <aside className="hidden lg:flex flex-col gap-3 min-w-[220px] max-w-[240px] pr-6 border-r border-neutral-200 text-sm font-normal text-black pt-4 shrink-0">
                    {categories?.slice(0, 9).map((cat: any) => (
                        <NavLink to={`/all-product?category=${cat.id}`} key={cat.id} className="flex items-center justify-between hover:text-[#DB4444] cursor-pointer transition-colors group py-1">
                            <span className="truncate">{cat.categoryName}</span>
                            {cat.subCategories?.length > 0 && (
                                <ChevronRight className="size-4 text-neutral-400 group-hover:text-[#DB4444] transition-colors shrink-0" />
                            )}
                        </NavLink>
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
