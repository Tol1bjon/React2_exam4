import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Truck, RotateCcw } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { GetProducts, addToCart, toggleLike } from '@/Store/RTK';
import { Store } from '@/Store/Store';
import { saveLikes } from '@/lib/Tokens';

const InfoProductions = () => {
    const dispatch = useDispatch<typeof Store.dispatch>();
    const navigate = useNavigate();
    const { id } = useParams();
    const { products, like, user, token, loading, error } = useSelector((state: any) => state.auth);
    const [authOpen, setAuthOpen] = useState(!token);
    const [quantitySelection, setQuantitySelection] = useState<{ productId: string, quantity: number } | null>(null);
    const [selectedImageState, setSelectedImageState] = useState<{ productId: string, image: string } | null>(null);
    const product = products.find((item: any) => String(item.id) === id);

    useEffect(() => {
        if (token && products.length === 0) {
            dispatch(GetProducts());
        }
    }, [dispatch, products.length, token]);

    const productImages: string[] = product ? product.images?.length ? product.images.map((image: any) => image.images || image) : product.image ? [product.image] : []: [];
    const price = product?.hasDiscount ? product.discountPrice : product?.price;
    const maxQuantity = Math.max(1, Number(product?.quantity) || 1);
    const quantity = quantitySelection?.productId === id ? quantitySelection?.quantity || 1: 1;
    const selectedImage = selectedImageState?.productId === id ? selectedImageState?.image || productImages[0] || '' : productImages[0] || '';

    const handleLike = () => {
        if (!token) {
            setAuthOpen(true);
            return;
        }

        const nextLikes = like.includes(product.id)
            ? like.filter((item: number) => item !== product.id)
            : [...like, product.id];

        dispatch(toggleLike(product.id));

        if (user?.sid) {
            saveLikes(String(user.sid), nextLikes);
        }
    };

    const handleBuyNow = () => {
        if (!token) {
            setAuthOpen(true);
            return;
        }

        dispatch(addToCart({ productId: product.id, quantity }));
        navigate('/my-order');
    };

    const imageUrl = (image: string) => `${import.meta.env.VITE_API}/images/${image}`;

    return (
        <>
            <main className="mx-auto w-full max-w-292.5 px-4 pb-14 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
                <div className="mb-7 flex flex-wrap items-center gap-2 text-xs text-neutral-500 sm:mb-10 sm:text-sm">
                    <Link to="/" className="hover:text-black">Home</Link>
                    <span>/</span>
                    <span>{product?.categoryName || 'Product'}</span>
                    <span>/</span>
                    <span className="text-black">{product?.productName || 'Product details'}</span>
                </div>

                {!product ? (
                    <div className="py-16 text-center">
                        <p className={error ? 'text-[#DB4444]' : 'text-neutral-500'}>
                            {loading ? 'Loading product...' : error || 'Product not found'}
                        </p>
                        <Link to="/all-product" className="mt-5 inline-block text-sm text-[#DB4444] underline">
                            Back to products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
                        <section className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
                            <div className="flex gap-2 overflow-x-auto sm:w-25 sm:flex-col sm:overflow-visible">
                                {productImages.map((image) => (
                                    <button key={image} type="button" onClick={() => setSelectedImageState({ productId: id || '', image })} aria-label={`View ${product.productName} image`} className={`flex size-18 shrink-0 items-center justify-center rounded-sm bg-[#F5F5F5] p-2 sm:size-22.5 ${selectedImage === image ? 'ring-1 ring-neutral-300' : ''}`}>
                                        <img src={imageUrl(image)} alt="" className="max-h-full max-w-full object-contain" />
                                    </button>
                                ))}
                            </div>

                            <div className="flex min-h-75 flex-1 items-center justify-center rounded-sm bg-[#F5F5F5] p-6 sm:min-h-105 sm:p-10">
                                {selectedImage ? (
                                    <img src={imageUrl(selectedImage)} alt={product.productName} className="max-h-90 max-w-full object-contain"/>
                                ) : (
                                    <span className="text-sm text-neutral-400">No Image</span>
                                )}
                            </div>
                        </section>

                        <section>
                            <h1 className="text-xl font-medium text-black sm:text-2xl">
                                {product.productName}
                            </h1>

                            <div className="mt-3 flex items-center gap-3 text-xs">
                                <span className="text-neutral-400">{product.brand || 'Product'}</span>
                                <span className="text-neutral-300">|</span>
                                <span className={maxQuantity > 0 ? 'text-emerald-500' : 'text-[#DB4444]'}>
                                    {maxQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            <p className="mt-3 text-2xl font-medium text-black">${price}</p>
                            <div className="my-5 border-b border-neutral-300" />

                            {product.color && (
                                <p className="mb-5 text-sm text-black">
                                    Colours: <span className="ml-2 text-neutral-500">{product.color}</span>
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex h-10 items-center overflow-hidden rounded-sm border border-neutral-400">
                                    <button type="button" onClick={() => setQuantitySelection({
                                            productId: id || '',
                                            quantity: Math.max(1, quantity - 1)
                                        })} aria-label="Decrease quantity" className="flex h-full w-10 items-center justify-center hover:bg-neutral-100">
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="flex h-full min-w-12 items-center justify-center border-x border-neutral-400 px-3 text-sm">
                                        {quantity}
                                    </span>
                                    <button type="button" onClick={() => setQuantitySelection({
                                            productId: id || '',
                                            quantity: Math.min(maxQuantity, quantity + 1)
                                        })} aria-label="Increase quantity" className="flex h-full w-10 items-center justify-center bg-[#DB4444] text-white hover:bg-[#c93b3b]">
                                        <Plus className="size-4" />
                                    </button>
                                </div>

                                <button type="button" onClick={handleBuyNow} className="h-10 flex-1 rounded-sm bg-[#DB4444] px-5 text-sm font-medium text-white transition-colors hover:bg-[#c93b3b] sm:flex-none">
                                    Buy Now
                                </button>

                                <button type="button" onClick={handleLike} aria-label={like.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} className={`flex size-10 items-center justify-center rounded-sm border border-neutral-400 transition-colors hover:border-[#DB4444] hover:text-[#DB4444] ${like.includes(product.id) ? 'text-[#DB4444]' : 'text-black'}`}>
                                    <Heart className={`size-5 ${like.includes(product.id) ? 'fill-[#DB4444]' : ''}`} />
                                </button>
                            </div>

                            <div className="mt-6 border border-neutral-400">
                                <div className="flex items-center gap-4 border-b border-neutral-400 p-4">
                                    <Truck className="size-6 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Free Delivery</p>
                                        <p className="mt-1 text-[11px] text-neutral-600">Free delivery for this product.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4">
                                    <RotateCcw className="size-6 shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium">Return Delivery</p>
                                        <p className="mt-1 text-[11px] text-neutral-600">Contact us for return details.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </main>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
};

export default InfoProductions;
