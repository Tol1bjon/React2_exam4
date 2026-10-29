import { NavLink } from 'react-router-dom';
import { SendHorizontal } from 'lucide-react';

const FacebookIcon = ({ className = 'size-5' }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const TwitterIcon = ({ className = 'size-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
);

const InstagramIcon = ({ className = 'size-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
);

const LinkedinIcon = ({ className = 'size-5' }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const Footer = () => {
    return (
        <footer className='bg-black text-white pt-10 lg:pt-16'>
            <div className='max-w-[1300px] mx-auto px-6 lg:px-4 flex flex-col lg:flex-row justify-between gap-9 lg:gap-10'>
                {/* 1. Exclusive / Subscribe */}
                <div className='flex flex-col gap-4'>
                    <h3 className='text-2xl font-bold tracking-wider'>Exclusive</h3>
                    <h4 className='text-xl lg:text-base font-medium'>Subscribe</h4>
                    <p className='text-sm text-neutral-200'>Get 10% off your first order</p>
                    <form onSubmit={(e) => e.preventDefault()} className='flex items-center justify-between border border-white/70 rounded px-4 py-2.5 w-full max-w-[340px] lg:max-w-[240px]'>
                        <input type="email" placeholder="Enter your email" className="bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none w-full pr-2"/>
                        <button type="submit" aria-label="Subscribe" className="text-white hover:text-neutral-300 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"> <SendHorizontal className="size-5 shrink-0" /></button>
                    </form>
                </div>

                {/* 2. Support */}
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl lg:text-base font-medium'>Support</h4>
                    <div className='flex flex-col gap-3.5 text-sm text-neutral-200'>
                        <p className='leading-relaxed'>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</p>
                        <a href="mailto:exclusive@gmail.com" className='hover:text-white transition-colors'>exclusive@gmail.com</a>
                        <a href="tel:+88015888889999" className='hover:text-white transition-colors'>+88015-88888-9999</a>
                    </div>
                </div>

                {/* 3 & 4. Account and Quick Link (2-column grid on mobile, inline on desktop) */}
                <div className='grid grid-cols-2 gap-6 lg:contents'>
                    <div className='flex flex-col gap-4'>
                        <h4 className='text-xl lg:text-base font-medium'>Account</h4>
                        <div className='flex flex-col gap-3.5 text-sm text-neutral-200'>
                            <NavLink to={'/account'} className='hover:text-white transition-colors'>My Account</NavLink>
                            <NavLink to={'/cart'} className='hover:text-white transition-colors'>Cart</NavLink>
                            <NavLink to={'/wishlist'} className='hover:text-white transition-colors'>Wishlist</NavLink>
                            <NavLink to={'/shop'} className='hover:text-white transition-colors'>Shop</NavLink>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <h4 className='text-xl lg:text-base font-medium'>Quick Link</h4>
                        <div className='flex flex-col gap-3.5 text-sm text-neutral-200'>
                            <NavLink to={'/privacy'} className='hover:text-white transition-colors'>Privacy Policy</NavLink>
                            <NavLink to={'/terms'} className='hover:text-white transition-colors'>Terms Of Use</NavLink>
                            <NavLink to={'/faq'} className='hover:text-white transition-colors'>FAQ</NavLink>
                            <NavLink to={'/contact'} className='hover:text-white transition-colors'>Contact</NavLink>
                        </div>
                    </div>
                </div>

                {/* 5. Social */}
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl lg:text-base font-medium'>Social</h4>
                    <div className='flex items-center gap-6 text-white'>
                        <a href="#" aria-label="Facebook" className='hover:text-neutral-400 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'> <FacebookIcon className='size-5' /></a>
                        <a href="#" aria-label="Twitter" className='hover:text-neutral-400 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'> <TwitterIcon className='size-5' /></a>
                        <a href="#" aria-label="Instagram" className='hover:text-neutral-400 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'> <InstagramIcon className='size-5' /></a>
                        <a href="#" aria-label="LinkedIn" className='hover:text-neutral-400 transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0'> <LinkedinIcon className='size-5' /></a>
                    </div>
                </div>
            </div>

            {/* Bottom copyright */}
            <div className='border-t border-white/10 mt-14 pt-4 pb-6 text-center text-xs'>
                <p className='flex flex-col sm:flex-row items-center justify-center gap-1 text-neutral-500'>
                    <span>&copy; Copyright Rimel 2022.</span>
                    <span>All right reserved</span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
