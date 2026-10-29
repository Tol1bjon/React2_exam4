import { useState, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import Check from '@/components/Check';
import { clearCart } from '@/Store/RTK';

const Checkout = () => {
    const dispatch = useDispatch();
    const { token, cart, products } = useSelector((state: any) => state.auth);
    const [authOpen, setAuthOpen] = useState(!token);
    const [checkOpen, setCheckOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const cartProducts = cart.map((cartItem: any) => {
            const product = products.find(
                (item: any) => item.id === cartItem.productId
            );

            return product ? { ...product, quantity: cartItem.quantity }: null;
        }).filter((item: any) => item !== null);

    const cartTotal = cartProducts.reduce((total: number, item: any) => {
        const price = item.hasDiscount ? item.discountPrice : item.price;
        return total + price * item.quantity;
    }, 0);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!token) {
            setAuthOpen(true);
            return;
        }

        if (cartProducts.length === 0) return;

        dispatch(clearCart());
        setCheckOpen(true);
    };

    return (
        <>
            <main className="mx-auto w-full max-w-292.5 px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
                <div className="mb-7 flex items-center gap-2.5 text-xs sm:mb-10 sm:text-sm">
                    <NavLink to="/all-product" className="text-neutral-400 hover:text-black">
                        Product
                    </NavLink>
                    <span className="text-neutral-400">/</span>
                    <NavLink to="/my-order" className="text-neutral-400 hover:text-black">
                        View Cart
                    </NavLink>
                    <span className="text-neutral-400">/</span>
                    <span className="font-medium text-black">CheckOut</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8 md:grid-cols-2 md:gap-16">
                        <section>
                            <h1 className="mb-4 text-2xl font-medium tracking-wide text-black sm:text-3xl">
                                Billing Details
                            </h1>

                            <div className="flex flex-col gap-3 rounded-sm bg-white p-4 shadow-[0_2px_16px_rgba(0,0,0,0.12)] sm:p-5">
                                <input required name="firstName" autoComplete="given-name" placeholder="First name" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input required name="lastName" autoComplete="family-name" placeholder="Last name" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input required name="street" autoComplete="street-address" placeholder="Street address" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input name="apartment" placeholder="Apartment, floor, etc. (optional)" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input required name="city" autoComplete="address-level2" placeholder="Town/City" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input required name="phone" type="tel" autoComplete="tel" placeholder="Phone number" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <input required name="email" type="email" autoComplete="email" placeholder="Email address" className="h-10 w-full rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]" />
                                <label className="flex cursor-pointer items-start gap-2 text-xs text-black">
                                    <input type="checkbox" className="mt-0.5 accent-[#DB4444]" />
                                    <span>Save this information for faster check-out next time</span>
                                </label>
                            </div>
                        </section>

                        <section className="pt-1 md:pt-12">
                            <div className="mb-5 flex flex-col gap-4">
                                {cartProducts.map((item: any) => {
                                    const price = item.hasDiscount ? item.discountPrice : item.price;
                                    const subtotal = price * item.quantity;

                                    return (
                                        <div key={item.id} className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                            <div className="flex min-w-0 items-center gap-3">
                                                {item.image && (
                                                    <img src={`${import.meta.env.VITE_API}/images/${item.image}`} alt={item.productName} className="size-10 shrink-0 object-contain"/>
                                                )}
                                                <span className="truncate">{item.productName}</span>
                                                <span className="shrink-0 text-neutral-500">× {item.quantity}</span>
                                            </div>
                                            <span className="shrink-0">${subtotal}</span>
                                        </div>
                                    );
                                })}
                                {cartProducts.length === 0 && (
                                    <p className="text-sm text-neutral-500">
                                        Your cart is empty.{' '}
                                        <NavLink to="/my-order" className="text-[#DB4444] underline">
                                            Return to cart
                                        </NavLink>
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between py-2 text-xs sm:text-sm">
                                <span>Subtotal:</span>
                                <span>${cartTotal}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-neutral-300 py-2 text-xs sm:text-sm">
                                <span>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div className="flex items-center justify-between py-3 text-sm font-semibold sm:text-base">
                                <span>Total:</span>
                                <span>${cartTotal}</span>
                            </div>

                            <div className="my-4 flex flex-col gap-3 text-xs sm:text-sm">
                                <label className="flex cursor-pointer items-center justify-between gap-3">
                                    <span className="flex items-center gap-3">
                                        <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="accent-black"/>
                                        Bank
                                    </span>
                                    <span className="font-semibold text-blue-700">VISA　Mastercard</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-3">
                                    <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="accent-black"/>
                                    Cash on delivery
                                </label>
                            </div>

                            <div className="my-5 flex items-center gap-3 bg-white p-3 shadow-[0_2px_16px_rgba(0,0,0,0.12)]">
                                <input type="text" placeholder="Coupon Code" className="h-10 min-w-0 flex-1 rounded-sm border border-neutral-300 px-3 text-xs outline-none focus:border-[#DB4444]"/>
                                <button type="button" className="h-10 w-22.5 shrink-0 rounded-sm border border-[#DB4444] text-xs font-medium text-[#DB4444] hover:bg-[#DB4444] hover:text-white">
                                    Apply
                                </button>
                            </div>

                            <button type="submit" disabled={cartProducts.length === 0} className="h-11 w-full rounded-sm bg-[#DB4444] text-sm font-medium text-white transition-colors hover:bg-[#c93b3b] disabled:cursor-not-allowed disabled:opacity-50 sm:w-40">
                                Place Order
                            </button>
                        </section>
                    </div>
                </form>
            </main>

            <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
            <Check isOpen={checkOpen} onClose={() => setCheckOpen(false)} />
        </>
    );
};

export default Checkout;
