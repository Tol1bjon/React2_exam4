import { useNavigate } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
    const navigate = useNavigate();

    return (
        <main className="mx-auto max-w-292.5 px-4 py-8 sm:px-6 sm:py-12">
            <div className="mb-10 flex gap-2 text-xs text-neutral-500">
                <span>Home</span>
                <span>/</span>
                <span className="text-black">Contact</span>
            </div>

            <div className="grid gap-8 md:grid-cols-[340px_minmax(0,1fr)]">
                <section className="rounded-sm bg-white p-6 shadow-[0_1px_13px_rgba(0,0,0,0.12)]">
                    <div className="flex items-center gap-4">
                        <span className="flex size-10 items-center justify-center rounded-full bg-[#DB4444] text-white">
                            <Phone className="size-5" />
                        </span>
                        <h1 className="text-base font-medium">Call To Us</h1>
                    </div>
                    <p className="mt-4 text-sm">We are available 24/7, 7 days a week.</p>
                    <p className="mt-2 text-sm">Phone: +8801611112222</p>

                    <div className="my-6 border-t border-neutral-300" />

                    <div className="flex items-center gap-4">
                        <span className="flex size-10 items-center justify-center rounded-full bg-[#DB4444] text-white">
                            <Mail className="size-5" />
                        </span>
                        <h2 className="text-base font-medium">Write To Us</h2>
                    </div>
                    <p className="mt-4 text-sm">Fill out our form and we will contact you within 24 hours.</p>
                    <p className="mt-3 text-sm">Emails: customer@exclusive.com</p>
                    <p className="mt-2 text-sm">Emails: support@exclusive.com</p>
                </section>

                <form onSubmit={(event) => {
                        event.preventDefault();
                        navigate('/feedback');
                    }} className="rounded-sm bg-white p-6 shadow-[0_1px_13px_rgba(0,0,0,0.12)]">
                    <div className="grid gap-4 sm:grid-cols-3">
                        <input required name="name" placeholder="Your Name" className="h-12 min-w-0 rounded-sm bg-[#F5F5F5] px-4 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]" />
                        <input required type="email" name="email" placeholder="Your Email" className="h-12 min-w-0 rounded-sm bg-[#F5F5F5] px-4 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]" />
                        <input required type="tel" name="phone" placeholder="Your Phone" className="h-12 min-w-0 rounded-sm bg-[#F5F5F5] px-4 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]" />
                    </div>
                    <textarea required name="message" placeholder="Your Message" className="mt-4 min-h-48 w-full resize-y rounded-sm bg-[#F5F5F5] p-4 text-sm outline-none focus:ring-1 focus:ring-[#DB4444]" />
                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="rounded-sm bg-[#DB4444] px-8 py-3 text-sm text-white transition-colors hover:bg-[#c93b3b]">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Contact;
