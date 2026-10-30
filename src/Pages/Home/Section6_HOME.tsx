import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from 'swiper/modules';
import { Eye, Heart } from 'lucide-react';
import { addToCart, toggleLike } from '@/Store/RTK';
import { saveLikes } from '@/lib/Tokens';
import AuthModal from '@/components/AuthModal';
import 'swiper/css';
import 'swiper/css/grid';

const Section6HOME = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authOpen, setAuthOpen] = useState(false)
    const { products, like, user, token } = useSelector((state: any) => state.auth);
    const items = products?.slice(0, 8) || [];
    const handleLike = (id: number) => {
        if (!token) {
            setAuthOpen(true)
            return;
        }
        const nextLikes = like.includes(id) ? like.filter((item: number) => item !== id) : [...like, id];
        dispatch(toggleLike(id));
        if (user?.sid) {
            saveLikes(String(user.sid), nextLikes);
        }
    };

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
                <span className="text-[#DB4444] font-semibold text-sm sm:text-base">Our Products</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold text-black tracking-tight mb-8 sm:mb-12">Explore Our Products</h2>

            <Swiper modules={[Grid]} grid={{ rows: 1, fill: 'row' }} slidesPerView={1.3} spaceBetween={16}
                breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 16, grid: { rows: 1 } },
                    768: { slidesPerView: 3, spaceBetween: 24, grid: { rows: 2 } },
                    1024: { slidesPerView: 4, spaceBetween: 30, grid: { rows: 2 } }
                }} className="w-full">
                {items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="flex flex-col gap-3 group/card select-none">
                            <div className="relative bg-[#F5F5F5] rounded-sm h-[250px] w-full flex items-center justify-center p-6 overflow-hidden">
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
                                    <span className="text-[#DB4444] font-medium">
                                        ${item.hasDiscount ? item.discountPrice : item.price}
                                    </span>
                                    {item.hasDiscount && item.discountPrice > 0 && (
                                        <span className="text-neutral-400 line-through">${item.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center mt-8">
                <NavLink to="/all-product" className="bg-[#DB4444] text-white text-sm sm:text-base font-medium px-10 py-3.5 rounded transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 shadow-sm">View All Products</NavLink>
            </div>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </section>
    );
}

export default Section6HOME;
