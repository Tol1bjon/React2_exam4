import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart, Eye } from 'lucide-react';
import { addToCart, toggleLike } from '@/Store/RTK';
import { saveLikes } from '@/lib/Tokens';
import AuthModal from '@/components/AuthModal';
import 'swiper/css';

const Section4HOME = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [authOpen, setAuthOpen] = useState(false)
    const { products, like, user, token } = useSelector((state: any) => state.auth);
    const handleLike = (id: number) => {
        if (!token) {
            setAuthOpen(true)
            return;
        }

        const nextLikes = like.includes(id)
            ? like.filter((item: number) => item !== id)
            : [...like, id];

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

    // Take 4 products from backend (or fallback to mockup items if loading)
    const items = (products && products.length > 0)
        ? products.slice(0, 4)
        : [
            { id: 1, productName: 'The north coat', price: 360, discountPrice: 260, hasDiscount: true, image: '' },
            { id: 2, productName: 'Gucci duffle bag', price: 1160, discountPrice: 960, hasDiscount: true, image: '' },
            { id: 3, productName: 'RGB liquid CPU Cooler', price: 170, discountPrice: 160, hasDiscount: true, image: '' },
            { id: 4, productName: 'Small BookSelf', price: 360, discountPrice: 0, hasDiscount: false, image: '' },
        ];

    return (
        <section className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14">
            {/* Red Badge */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded-sm" />
                <span className="text-[#DB4444] font-semibold text-sm sm:text-base">This Month</span>
            </div>

            {/* Header: Title and View All Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-14">
                <h2 className="text-2xl sm:text-4xl font-semibold text-black tracking-tight">Best Selling Products</h2>
                <button type="button" className="self-start sm:self-auto bg-[#DB4444] text-white text-sm sm:text-base font-medium px-10 py-3.5 rounded transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm">View All</button>
            </div>

            {/* Swiper on mobile / 4-grid on desktop */}
            <Swiper slidesPerView={1.3} spaceBetween={16}
                breakpoints={{
                    480: { slidesPerView: 2, spaceBetween: 16 },
                    768: { slidesPerView: 3, spaceBetween: 24 },
                    1024: { slidesPerView: 4, spaceBetween: 30 }
                }} className="w-full">
                {items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <div className="flex flex-col gap-3 group/card select-none">
                            {/* Card Image Box */}
                            <div className="relative bg-[#F5F5F5] rounded-sm h-[250px] w-full flex items-center justify-center p-6 overflow-hidden">
                                {/* Wishlist & Quick View Icons */}
                                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                                    <button onClick={() => handleLike(item.id)} type="button" className="size-8 sm:size-9 rounded-full bg-white flex items-center justify-center text-black hover:text-[#DB4444] transition-colors cursor-pointer shadow-sm" aria-label={like.includes(item.id) ? 'Remove from wishlist' : 'Add to wishlist'}>
                                        <Heart className={`size-4 sm:size-5 ${like.includes(item.id) ? 'fill-[#DB4444] text-[#DB4444]' : ''}`} />
                                    </button>
                                    <button onClick={() => handleViewProduct(item.id)} type="button" className="size-8 sm:size-9 rounded-full bg-white flex items-center justify-center text-black hover:text-[#DB4444] transition-colors cursor-pointer shadow-sm">
                                        <Eye className="size-4 sm:size-5" />
                                    </button>
                                </div>

                                {/* Product Image */}
                                {item.image ? (
                                    <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="max-h-[170px] max-w-[170px] object-contain transition-transform duration-200 group-hover/card:-translate-y-1" />
                                ) : (
                                    <div className="w-24 h-24 bg-neutral-200 rounded flex items-center justify-center text-neutral-400 text-xs">No Image</div>
                                )}

                                {/* Hover Button: Add To Cart (slides up from bottom) */}
                                <button onClick={() => handleAddToCart(item.id)} type="button" className="absolute bottom-0 left-0 w-full bg-black text-white text-sm font-medium py-2.5 text-center cursor-pointer transition-transform duration-200 translate-y-full group-hover/card:translate-y-0 active:bg-neutral-800">Add To Cart</button>
                            </div>

                            {/* Card Details */}
                            <div className="flex flex-col gap-1.5 pt-1">
                                <h3 className="font-medium text-black text-sm sm:text-base truncate" title={item.productName}>
                                    {item.productName}
                                </h3>

                                {/* Price Row */}
                                <div className="flex items-center gap-3 text-sm sm:text-base">
                                    <span className="text-[#DB4444] font-medium">
                                        ${item.hasDiscount ? item.discountPrice : item.price}
                                    </span>
                                    {item.hasDiscount && item.discountPrice > 0 && (
                                        <span className="text-neutral-400 line-through">
                                            ${item.price}
                                        </span>
                                    )}
                                </div>

                                {/* Rating Row (5 Stars + (65)) */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center text-[#FFAD33]">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="size-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-neutral-500 text-xs sm:text-sm font-medium">
                                        (65)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </section>
    );
};

export default Section4HOME;
