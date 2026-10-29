import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleLike } from '@/Store/RTK';
import { NavLink, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeft, ArrowRight, Eye, Heart } from 'lucide-react';
import 'swiper/css';
import { saveLikes } from '@/lib/Tokens';
import AuthModal from '@/components/AuthModal';

const Section2HOME = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authOpen, setAuthOpen] = useState(false)

    const [swiperRef, setSwiperRef] = useState<any>(null);
    const [deadline] = useState(() => {
        const now = new Date();
        const end = new Date(now.getFullYear(), 9, 30, 23, 59, 59);
        if (end <= now) end.setFullYear(end.getFullYear() + 1);
        return end;
    });
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const { products, like, user, token } = useSelector((state: any) => state.auth);
    const items = products?.filter((item: any) => item.hasDiscount) || [];

    useEffect(() => {
        const updateTimeLeft = () => {
            const secondsLeft = Math.max(0, Math.floor((deadline.getTime() - Date.now()) / 1000));
            setTimeLeft({
                days: Math.floor(secondsLeft / 86400),
                hours: Math.floor((secondsLeft % 86400) / 3600),
                minutes: Math.floor((secondsLeft % 3600) / 60),
                seconds: secondsLeft % 60
            });
        };

        updateTimeLeft();
        const timer = setInterval(updateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [deadline]);

    if (items.length === 0) return null;




    const handleLike = (id: any) => {
        if (!token) {
            setAuthOpen(true)
            return;
        }

        const nextLikes = like.includes(id) ? like.filter((user: number) => user != id) : [...like, id]
        dispatch(toggleLike(id))
        if(user?.sid){
            saveLikes(user.sid, nextLikes)
        }
    }

    const handleAddToCart = (id: number) => {
        if (!token) {
            setAuthOpen(true)
            return;
        }

        dispatch(addToCart(id));
    };

    const handleViewProduct = (id: number) => {
        if (!token) {
            setAuthOpen(true)
            return;
        }

        navigate(`/product/${id}`);
    };

    return (
        <section className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded-sm" />
                <span className="text-[#DB4444] font-semibold text-sm sm:text-base">Today’s</span>
            </div>

            <div className="flex items-center justify-between mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-10">
                    <h2 className="text-2xl sm:text-4xl font-semibold text-black tracking-tight">Flash Sales</h2>

                    <div className="flex items-start gap-2 sm:gap-4">
                        {[
                            { label: 'Days', value: timeLeft.days },
                            { label: 'Hours', value: timeLeft.hours },
                            { label: 'Minutes', value: timeLeft.minutes },
                            { label: 'Seconds', value: timeLeft.seconds }
                        ].map((item, index) => (
                            <Fragment key={item.label}>
                                <div className="flex flex-col min-w-[35px] sm:min-w-[45px]">
                                    <span className="text-[10px] sm:text-xs font-medium text-black">{item.label}</span>
                                    <span className="text-2xl sm:text-3xl font-bold leading-tight text-black">
                                        {String(item.value).padStart(2, '0')}
                                    </span>
                                </div>
                                {index < 3 && (
                                    <span className="text-[#DB4444] text-lg sm:text-xl font-bold leading-none pt-0.5">:</span>
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button type="button" onClick={() => swiperRef?.slidePrev()} className="size-10 sm:size-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black transition-colors cursor-pointer" aria-label="Previous products">
                        <ArrowLeft className="size-4 sm:size-5" />
                    </button>
                    <button type="button" onClick={() => swiperRef?.slideNext()} className="size-10 sm:size-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-black transition-colors cursor-pointer" aria-label="Next products">
                        <ArrowRight className="size-4 sm:size-5" />
                    </button>
                </div>
            </div>

            <Swiper onSwiper={setSwiperRef} slidesPerView={1.3} spaceBetween={16}
                breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 30 }
                }} className="w-full">
                {items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="flex flex-col gap-3 group/card select-none">
                            <div className="relative bg-[#F5F5F5] rounded-sm h-[250px] w-full flex items-center justify-center p-6 overflow-hidden">
                                {item.price > 0 && item.discountPrice > 0 && (
                                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2.5 py-1 rounded-sm z-10">
                                        -{Math.round((1 - item.discountPrice / item.price) * 100)}%
                                    </span>
                                )}

                                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                    <button onClick={() => handleLike(item.id)} type="button" className="size-8 sm:size-9 rounded-full bg-white flex items-center justify-center text-black hover:text-[#DB4444] transition-colors cursor-pointer shadow-sm" aria-label={like.includes(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
                                        <Heart className={`size-4 sm:size-5 ${like.includes(item.id) ? 'fill-[#DB4444] text-[#DB4444]' : ''}`} />
                                    </button>
                                    <button onClick={() => handleViewProduct(item.id)} type="button" className="size-8 sm:size-9 rounded-full bg-white flex items-center justify-center text-black hover:text-[#DB4444] transition-colors cursor-pointer shadow-sm" aria-label="Quick view">
                                        <Eye className="size-4 sm:size-5" />
                                    </button>
                                </div>

                                {item.image ? (
                                    <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="max-h-[170px] max-w-[170px] object-contain transition-transform duration-200 group-hover/card:-translate-y-1" />
                                ) : (
                                    <div className="w-24 h-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-400 text-xs">No Image</div>
                                )}

                                <button onClick={() => handleAddToCart(item.id)} type="button" className="absolute bottom-0 left-0 w-full bg-black text-white text-sm font-medium py-2.5 text-center cursor-pointer transition-transform duration-200 translate-y-full group-hover/card:translate-y-0 active:bg-neutral-800">Add To Cart</button>
                            </div>

                            <div className="flex flex-col gap-1.5 pt-1">
                                <h3 className="font-medium text-black text-sm sm:text-base truncate" title={item.productName}>
                                    {item.productName}
                                </h3>

                                <div className="flex items-center gap-3 text-sm sm:text-base">
                                    <span className="text-[#DB4444] font-medium">${item.discountPrice}</span>
                                    <span className="text-neutral-400 line-through">${item.price}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center mt-8">
                <NavLink to="/all-product" className="bg-[#DB4444] text-white text-sm sm:text-base font-medium px-10 py-3.5 rounded transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 shadow-sm">View All Products</NavLink>
            </div>

            <div className="border-b border-neutral-200 mt-12 sm:mt-16" />
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </section>
    );
}

export default Section2HOME;
