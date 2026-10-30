import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Eye, Heart } from 'lucide-react';
import { addToCart, GetCategories, GetProducts, toggleLike } from '@/Store/RTK';
import { Store } from '@/Store/Store';
import { saveLikes } from '@/lib/Tokens';
import AuthModal from '@/components/AuthModal';

const AllProduct = () => {
    const dispatch = useDispatch<typeof Store.dispatch>();
    const navigate = useNavigate();
    const { products, categories, like, user, token, loading, error } = useSelector((state: any) => state.auth);
    const [category, setCategory] = useState<number | null>(null);
    const [sort, setSort] = useState('popularity');
    const [showAll, setShowAll] = useState<string[]>([]);
    const [authOpen, setAuthOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceRange, setPriceRange] = useState<number[] | null>(null);
    const maxPriceLimit = Math.ceil(Math.max(1, ...products.map((item: any) => Number(price(item)) || 0)));
    const selectedMin = Math.min(Math.max(0, Number(minPrice) || 0), maxPriceLimit);
    const selectedMax = maxPrice === '' ? maxPriceLimit : Math.max(selectedMin, Math.min(maxPriceLimit, Number(maxPrice) || 0));

    useEffect(() => {
        dispatch(GetProducts());
        dispatch(GetCategories());
    }, []);

    const toggleAll = (name: string) => {
        setShowAll((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
    };

    const filteredProducts = useMemo(() => {
        const items = category === null ? [...products] : products.filter((item: any) => item.categoryId === category);
        const inPriceRange = priceRange ? items.filter((item: any) => price(item) >= priceRange[0] && price(item) <= priceRange[1]) : items;

        if (sort === 'price-low') return inPriceRange.sort((a: any, b: any) => price(a) - price(b));
        if (sort === 'price-high') return inPriceRange.sort((a: any, b: any) => price(b) - price(a));
        if (sort === 'name') return inPriceRange.sort((a: any, b: any) => a.productName.localeCompare(b.productName));
        return inPriceRange;
    }, [products, category, sort, priceRange]);

    const categoriesToShow = showAll.includes('category') ? categories : categories.slice(0, 5);
    const brands = [...new Set(products.map((item: any) => item.brand).filter(Boolean))];
    const brandsToShow = showAll.includes('brands') ? brands : brands.slice(0, 5);
    const features = ['Metallic', 'Plastic cover', 'RGB Ram', 'Super power', 'Large Memory'];
    const featuresToShow = showAll.includes('features') ? features : features.slice(0, 3);

    const seeAll = (name: string, count: number) => (
        count > 3 && (
            <button type="button" onClick={() => toggleAll(name)} className="mt-1 text-[11px] text-[#DB4444]">
                {showAll.includes(name) ? 'See less' : 'See all'}
            </button>
        )
    );

    const filterTitle = (title: string) => (
        <summary className="flex cursor-pointer list-none items-center justify-between border-b border-neutral-200 pb-1.5 text-xs font-medium text-black [&::-webkit-details-marker]:hidden">
            {title}
            <ChevronDown className="size-3 text-neutral-400 transition-transform group-open:rotate-180" />
        </summary>
    );

    const handleLike = (id: number) => {
        if (!token) {
            setAuthOpen(true);
            return;
        }

        const nextLikes = like.includes(id) ? like.filter((item: number) => item !== id) : [...like, id];

        dispatch(toggleLike(id));
        if (user?.sid) saveLikes(String(user.sid), nextLikes);
    };

    const handleView = (id: number) => {
        if (!token) {
            setAuthOpen(true);
            return;
        }
        navigate(`/product/${id}`);
    };

    const handleAddToCart = (id: number) => {
        if (!token) {
            setAuthOpen(true);
            return;
        }
        dispatch(addToCart(id));
    };

    return (
        <>
        <main className="mx-auto max-w-310 px-4 pb-14 pt-6 sm:px-6 sm:pt-10">
            <div className="mb-7 flex items-center gap-2 text-[11px] text-neutral-500">
                <Link to="/" className="hover:text-black">Home</Link>
                <span>/</span>
                <span className="text-black">Explore Our Products</span>
            </div>

            <details className="group mb-4 lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded border border-neutral-200 px-3 py-2 text-xs font-medium text-black [&::-webkit-details-marker]:hidden">
                    Category
                    <ChevronDown className="size-3 text-neutral-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setCategory(null)} className={`rounded border px-2 py-1 text-[11px] ${category === null ? 'border-[#DB4444] text-[#DB4444]' : 'border-neutral-200 text-neutral-600'}`}>
                        All products
                    </button>
                    {categoriesToShow.map((item: any) => (
                        <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={`rounded border px-2 py-1 text-[11px] ${category === item.id ? 'border-[#DB4444] text-[#DB4444]' : 'border-neutral-200 text-neutral-600'}`}>
                            {item.categoryName}
                        </button>
                    ))}
                    {seeAll('category', categories.length)}
                </div>
            </details>

            <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-6">
                <aside className="hidden lg:block">
                    <details open className="group mb-4 w-full">
                        {filterTitle('Category')}
                        <div className="mt-2 flex flex-col items-start gap-1.5">
                            <button type="button" onClick={() => setCategory(null)} className={`text-left text-[11px] ${category === null ? 'text-[#DB4444]' : 'text-neutral-600 hover:text-[#DB4444]'}`}>
                                All products
                            </button>
                            {categoriesToShow.map((item: any) => (
                                <button key={item.id} type="button" onClick={() => setCategory(item.id)} className={`text-left text-[11px] ${category === item.id ? 'text-[#DB4444]' : 'text-neutral-600 hover:text-[#DB4444]'}`}>
                                    {item.categoryName}
                                </button>
                            ))}
                            {seeAll('category', categories.length)}
                        </div>
                    </details>

                    <details open className="group mb-4 w-full">
                        {filterTitle('Brands')}
                        <div className="mt-2 flex flex-col gap-1.5">
                            {brandsToShow.map((brand: any) => (
                                <label key={brand} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                                    <input type="checkbox" className="size-3 accent-[#DB4444]" />
                                    {brand}
                                </label>
                            ))}
                            {seeAll('brands', brands.length)}
                        </div>
                    </details>

                    <details open className="group mb-4 w-full">
                        {filterTitle('Features')}
                        <div className="mt-2 flex flex-col gap-1.5">
                            {featuresToShow.map((feature) => (
                                <label key={feature} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                                    <input type="checkbox" className="size-3 accent-[#DB4444]" />
                                    {feature}
                                </label>
                            ))}
                            {seeAll('features', features.length)}
                        </div>
                    </details>

                    <details open className="group mb-4 w-full">
                        {filterTitle('Price range')}
                        <div className="mt-2">
                            <div className="relative my-3 h-1 rounded bg-[#F5DADA]">
                                <div
                                    className="absolute h-1 rounded bg-[#DB4444]"
                                    style={{
                                        left: `${(selectedMin / maxPriceLimit) * 100}%`,
                                        right: `${100 - (selectedMax / maxPriceLimit) * 100}%`,
                                    }}
                                />
                                <input type="range" min="0" max={selectedMax} value={selectedMin} onChange={(event) => setMinPrice(event.target.value)} aria-label="Minimum price" className="price-range-input"/>
                                <input type="range" min={selectedMin} max={maxPriceLimit} value={selectedMax} onChange={(event) => setMaxPrice(event.target.value)} aria-label="Maximum price" className="price-range-input"/>
                            </div>
                            <div className="mt-1 grid grid-cols-2 gap-1">
                                <input type="number" min="0" max={maxPriceLimit} placeholder="Min" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} className="h-7 min-w-0 rounded border border-neutral-300 px-1.5 text-[10px]"/>
                                <input type="number" min="0" max={maxPriceLimit} placeholder="Max" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="h-7 min-w-0 rounded border border-neutral-300 px-1.5 text-[10px]"/>
                            </div>
                            <button type="button" onClick={() => setPriceRange([selectedMin, selectedMax])} className="mt-1.5 w-full rounded border border-[#DB4444] py-1 text-[10px] text-[#DB4444]">
                                Apply
                            </button>
                        </div>
                    </details>

                    <details open className="group mb-4 w-full">
                        {filterTitle('Condition')}
                        <div className="mt-2 flex flex-col gap-1.5">
                            {['Any', 'Refurbished', 'Brand new', 'Old items'].map((item, index) => (
                                <label key={item} className="flex items-center gap-1.5 text-[11px] text-neutral-600">
                                    <input type="radio" name="condition" defaultChecked={index === 0} className="size-3 accent-[#DB4444]" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    </details>

                    <details open className="group mb-4 w-full">
                        {filterTitle('Ratings')}
                        <div className="mt-2">
                            {[5, 4, 3, 2].map((rating) => (
                                <label key={rating} className="mb-1.5 flex items-center gap-1.5 text-[11px]">
                                    <input type="checkbox" className="size-3 accent-[#DB4444]" />
                                    <span className="text-[#FFAD33]">
                                        {'★'.repeat(rating)}
                                        <span className="text-neutral-300">{'★'.repeat(5 - rating)}</span>
                                    </span>
                                </label>
                            ))}
                        </div>
                    </details>
                </aside>

                <section>
                    <div className="mb-4 flex justify-end">
                        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products" className="h-8 w-27.5 rounded-sm border border-neutral-300 bg-white px-2 text-[11px] text-black outline-none">
                            <option value="popularity">Popularity</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name</option>
                        </select>
                    </div>

                    {loading && !products.length ? (
                        <p className="py-16 text-center text-sm text-neutral-500">Loading products...</p>
                    ) : error && !products.length ? (
                        <p className="py-16 text-center text-sm text-[#DB4444]">{error}</p>
                    ) : filteredProducts.length === 0 ? (
                        <p className="py-16 text-center text-sm text-neutral-500">No products in this category.</p>
                    ) : (
                        <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5">
                            {filteredProducts.map((item: any) => (
                                <article key={item.id} className="group min-w-0">
                                    <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-sm bg-[#F5F5F5] p-3 sm:h-36.25">
                                        {item.hasDiscount && item.discountPrice > 0 && (
                                            <span className="absolute left-2 top-2 rounded-sm bg-emerald-500 px-1.5 py-0.5 text-[9px] text-white">
                                                -{Math.round((1 - item.discountPrice / item.price) * 100)}%
                                            </span>
                                        )}
                                        {item.image && (
                                            <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="max-h-full max-w-full object-contain"/>
                                        )}
                                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                                            <button type="button" onClick={() => handleLike(item.id)} aria-label={like.includes(item.id) ? 'Remove from wishlist' : 'Add to wishlist'} className="flex size-5 items-center justify-center rounded-full bg-white text-black hover:text-[#DB4444]">
                                                <Heart className={`size-3 ${like.includes(item.id) ? 'fill-[#DB4444] text-[#DB4444]' : ''}`} />
                                            </button>
                                            <button type="button" onClick={() => handleView(item.id)} aria-label={`View ${item.productName}`} className="flex size-5 items-center justify-center rounded-full bg-white text-black hover:text-[#DB4444]">
                                                <Eye className="size-3" />
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => handleAddToCart(item.id)} className="absolute bottom-0 left-0 w-full translate-y-full bg-black py-1.5 text-[10px] text-white transition-transform group-hover:translate-y-0">
                                            Add To Cart
                                        </button>
                                    </div>

                                    <h2 className="mt-1.5 truncate text-[10px] font-medium text-black sm:text-[11px]" title={item.productName}>
                                        {item.productName}
                                    </h2>
                                    <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                                        <span className="font-medium text-[#DB4444]">${price(item).toFixed(2)}</span>
                                        {item.hasDiscount && item.discountPrice > 0 && (
                                            <span className="text-neutral-400 line-through">${item.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className="mt-0.5 flex items-center gap-1 text-[10px]">
                                        <span className="text-[#FFAD33]">★★★★★</span>
                                        <span className="text-neutral-400">({item.rating ?? 65})</span>
                                    </div>
                                    {item.color && (
                                        <div className="mt-1.5 flex gap-1">
                                            <span className="size-2.5 rounded-full border border-neutral-300 bg-neutral-400" />
                                            <span className="size-2.5 rounded-full border border-neutral-300 bg-[#DB4444]" />
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            <div className="mt-10 flex justify-center">
                <button type="button" className="rounded-sm bg-[#DB4444] px-7 py-2.5 text-xs font-medium text-white hover:bg-[#c93b3b]">
                    More Products
                </button>
            </div>
        </main>
            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            </>
    );
};

function price(item: any) {
    return item.hasDiscount ? item.discountPrice : item.price;
}

export default AllProduct;
