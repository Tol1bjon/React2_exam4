import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { GetProducts, toggleLike } from '@/Store/RTK';
import { Store } from '@/Store/Store';
import { saveLikes } from '@/lib/Tokens';
import AuthModal from '@/components/AuthModal';

const Like = () => {
    const dispatch = useDispatch<typeof Store.dispatch>();
    const { products, like, user, token, loading, error } = useSelector((state: any) => state.auth);
    const [authOpen, setAuthOpen] = useState(!token);
    const likedProducts = products.filter((item: any) => like.includes(item.id));

    useEffect(() => {
        if (token && products.length === 0) {
            dispatch(GetProducts());
        }
    }, [dispatch, products.length, token]);

    const handleRemoveLike = (id: number) => {
        if (!token) {
            setAuthOpen(true);
            return;
        }

        const nextLikes = like.filter((item: number) => item !== id);
        dispatch(toggleLike(id));

        if (user?.sid) {
            saveLikes(String(user.sid), nextLikes);
        }
    };

    return (
        <main className="max-w-[1170px] mx-auto px-4 py-10 sm:py-16">
            <div className="flex items-center justify-between gap-4 mb-8 sm:mb-14">
                <h1 className="text-base sm:text-lg font-normal text-black">
                    Wishlist ({like.length})
                </h1>

                <button type="button" className="border border-black/40 rounded px-5 sm:px-9 py-3 text-sm sm:text-base font-medium text-black hover:bg-black hover:text-white transition-colors">
                    Move All To Bag
                </button>
            </div>

            {loading && products.length === 0 ? (
                <p className="py-12 text-center text-neutral-500">Loading products...</p>
            ) : error && products.length === 0 ? (
                <p className="py-12 text-center text-[#DB4444]">{error}</p>
            ) : likedProducts.length > 0 ? (
                <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-7 gap-y-8">
                    {likedProducts.map((item: any) => (
                        <article key={item.id} className="group/card min-w-0">
                            <div className="relative flex h-[250px] items-center justify-center overflow-hidden rounded-sm bg-[#F5F5F5] p-6">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveLike(item.id)}
                                    className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-[#DB4444] shadow-sm transition-colors hover:bg-neutral-100"
                                    aria-label={`Remove ${item.productName} from wishlist`}
                                >
                                    <Heart className="size-5 fill-[#DB4444] text-[#DB4444]" />
                                </button>

                                {item.image ? (
                                    <img
                                        src={`${import.meta.env.VITE_API}/images/${item.image}`}
                                        alt={item.productName}
                                        className="max-h-[170px] max-w-[170px] object-contain transition-transform duration-200 group-hover/card:scale-105"
                                    />
                                ) : (
                                    <div className="flex size-24 items-center justify-center rounded bg-neutral-200 text-xs text-neutral-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5 pt-3">
                                <h2 className="truncate text-sm font-medium text-black sm:text-base" title={item.productName}>
                                    {item.productName}
                                </h2>

                                <div className="flex items-center gap-3 text-sm sm:text-base">
                                    <span className="font-medium text-[#DB4444]">
                                        ${item.hasDiscount ? item.discountPrice : item.price}
                                    </span>
                                    {item.hasDiscount && item.discountPrice > 0 && (
                                        <span className="text-neutral-400 line-through">${item.price}</span>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center py-16 text-center">
                    <Heart className="mb-4 size-12 text-neutral-300" />
                    <p className="mb-5 text-neutral-500">Your wishlist is empty</p>
                    <NavLink to="/all-product" className="rounded bg-[#DB4444] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#c93b3b]">
                        Browse Products
                    </NavLink>
                </div>
            )}
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </main>
    );
};

export default Like;
