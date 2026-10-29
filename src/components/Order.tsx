import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RotateCw, Trash2, X } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { quanitityCart, removeCart } from '@/Store/RTK';

const Order = () => {
    const dispatch = useDispatch();
    const { token, cart, products } = useSelector((state: any) => state.auth);
    const [authOpen, setAuthOpen] = useState(!token);
    const cartProducts = cart.map((cartItem: any) => {
            const product = products.find((item: any) => item.id === cartItem.productId);

            return product ? { ...product, quantity: cartItem.quantity }: null;
        }).filter((item: any) => item !== null);

    const cartTotal = cartProducts.reduce((total: number, item: any) => {
        const price = item.hasDiscount ? item.discountPrice : item.price;
        return total + price * item.quantity;
    }, 0);

    return (
        <>
            <main className="mx-auto w-full max-w-[1170px] px-4 sm:px-6 pt-6 sm:pt-10 pb-12 sm:pb-20">
                {/* Хлебные крошки */}
                <div className="flex items-center gap-2.5 text-xs sm:text-sm mb-7 sm:mb-12">
                    <NavLink to="/" className="text-neutral-400 hover:text-black transition-colors">Home</NavLink>
                    <span className="text-neutral-400">/</span>
                    <span className="text-black font-medium">Cart</span>
                </div>

                {/* Шапка таблицы (скрыта на мобилке) */}
                <div className="hidden sm:grid grid-cols-[2.2fr_1.2fr_1.2fr_1fr_24px] items-center px-8 mb-5 text-sm text-neutral-500">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span className="text-center">Subtotal</span>
                    <span />
                </div>

                <div className="flex flex-col gap-2" aria-label="Cart items">
                    {cartProducts.length === 0 ? (
                        <div className="flex h-[80px] items-center justify-center rounded-[4px] bg-white px-6 text-sm text-neutral-500 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
                            Your cart is empty
                        </div>
                    ) : (
                        cartProducts.map((item: any) => {
                            const price = item.hasDiscount ? item.discountPrice : item.price;
                            const subtotal = price * item.quantity;

                            return (
                                <div key={item.id} className="grid min-h-[60px] grid-cols-[minmax(0,1.7fr)_0.7fr_0.8fr_0.8fr_20px] items-center gap-2 rounded-[4px] bg-white px-3 py-2 text-xs text-black shadow-[0_2px_16px_rgba(0,0,0,0.06)] sm:grid-cols-[2.2fr_1.2fr_1.2fr_1fr_24px] sm:px-6 sm:py-2 sm:text-sm">
                                    <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                                        {item.image && (
                                            <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="size-9 shrink-0 object-contain sm:size-10"/>
                                        )}
                                        <span className="truncate" title={item.productName}>
                                            {item.productName}
                                        </span>
                                    </div>

                                    <span>${price}</span>

                                    <input type="number" min="1" value={item.quantity}
                                        onChange={(event) =>
                                            dispatch(quanitityCart({
                                                productId: item.id,
                                                quanitity: Number(event.target.value)
                                            }))
                                        } aria-label={`Quantity of ${item.productName}`} className="h-8 w-12 rounded border border-neutral-400 bg-white px-1 text-center text-xs sm:h-[30px] sm:w-12 sm:text-sm"/>

                                    <span className="text-right font-semibold sm:text-center">
                                        ${subtotal}
                                    </span>

                                    <button type="button" onClick={() => dispatch(removeCart(item.id))} aria-label={`Remove ${item.productName}`} className="flex size-5 items-center justify-center rounded-full bg-[#DB4444] text-white transition-colors hover:bg-[#c93b3b] sm:size-[18px]">
                                        <X className="size-3 stroke-[3]" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Кнопки управления корзиной */}
                <div className="flex items-center justify-between gap-3 mt-6">
                    <NavLink to="/all-product" className="flex h-11 sm:h-[50px] w-[170px] sm:w-[200px] items-center justify-center border border-neutral-400 rounded-[4px] text-xs sm:text-sm font-medium text-black hover:bg-black hover:text-white transition-colors">
                        Return To Shop
                    </NavLink>

                    <div className="flex items-center gap-4 sm:gap-3">
                        <button type="button" aria-label="Update cart" className="flex size-9 items-center justify-center rounded text-black hover:bg-neutral-100 transition-colors sm:hidden">
                            <RotateCw className="size-5 stroke-[2.2]" />
                        </button>
                        <button type="button" className="hidden sm:flex h-[50px] w-[180px] items-center justify-center border border-[#A0A0A0] rounded-[4px] bg-white text-base font-medium text-black hover:bg-neutral-50 transition-colors">
                            Update Cart
                        </button>
                        <button type="button" aria-label="Remove all products" className="flex size-9 items-center justify-center rounded text-[#DB4444] hover:bg-red-50 transition-colors sm:hidden">
                            <Trash2 className="size-5 stroke-[2]" />
                        </button>
                        <button type="button" className="hidden sm:flex h-[50px] w-[170px] items-center justify-center border border-[#DB4444] rounded-[4px] bg-white text-base font-medium text-[#DB4444] hover:bg-red-50 transition-colors">
                            Remove all
                        </button>
                    </div>
                </div>

                {/* Купон и Итого (Cart Total) */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-7 sm:gap-8 mt-6 sm:mt-14">
                    {/* Поле купона + Apply */}
                    <div className="flex w-full md:w-auto items-center gap-3">
                        <input type="text" placeholder="Coupon Code" className="min-w-0 flex-1 md:flex-none md:w-[280px] border border-neutral-500 rounded-[4px] px-4 h-12 sm:h-[50px] text-xs sm:text-sm placeholder:text-neutral-400 outline-none focus:border-black"/>
                        <button type="button" className="h-12 sm:h-[50px] w-[100px] sm:w-[135px] shrink-0 border border-[#DB4444]/70 rounded-[4px] text-xs sm:text-sm font-medium text-[#DB4444] hover:bg-[#DB4444] hover:text-white transition-colors">
                            Apply
                        </button>
                    </div>

                    {/* Рамка Cart Total */}
                    <div className="w-full md:w-[420px] border border-neutral-600 rounded-[4px] p-5 sm:p-6">
                        <h2 className="text-base sm:text-lg font-medium text-black mb-4">Cart Total</h2>

                        <div className="flex items-center justify-between py-2 text-xs sm:text-sm text-neutral-700">
                            <span>Subtotal:</span>
                            <span className="text-black">${cartTotal}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 pb-3.5 text-xs sm:text-sm text-neutral-700">
                            <span>Shipping:</span>
                            <span className="text-black">Free</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-neutral-200 pt-3.5 pb-5 text-sm sm:text-base font-semibold text-black">
                            <span>Total:</span>
                            <span>${cartTotal}</span>
                        </div>

                        <NavLink to={'/checkout'}>
                            <button type="button" className="w-full sm:w-[240px] flex items-center justify-center mx-auto rounded-[4px] bg-[#DB4444] h-11 sm:h-[48px] text-xs sm:text-sm font-medium text-white hover:bg-[#c93b3b] transition-colors">
                                Proceed to checkout
                            </button>
                        </NavLink>
                    </div>
                </div>
            </main>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        </>
    );
}

export default Order;