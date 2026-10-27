import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import img1 from '../../assets/image 46.png';
import img2 from '../../assets/image 51.png';
import img3 from '../../assets/image 47.png';

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

const teamMembers = [
    {
        id: 1,
        name: 'Tom Cruise',
        role: 'Founder & Chairman',
        img: img1,
    },
    {
        id: 2,
        name: 'Emma Watson',
        role: 'Managing Director',
        img: img2,
    },
    {
        id: 3,
        name: 'Will Smith',
        role: 'Product Designer',
        img: img3,
    },
    {
        id: 4,
        name: 'Ryan Reynolds',
        role: 'Chief Executive Officer',
        img: img1,
    },
    {
        id: 5,
        name: 'Scarlett Johansson',
        role: 'Chief Operating Officer',
        img: img2,
    },
    {
        id: 6,
        name: 'Chris Hemsworth',
        role: 'Head of Engineering',
        img: img3,
    },
    {
        id: 7,
        name: 'Anne Hathaway',
        role: 'Creative Art Director',
        img: img2,
    },
    {
        id: 8,
        name: 'Keanu Reeves',
        role: 'Chief Technology Officer',
        img: img1,
    },
    {
        id: 9,
        name: 'Robert Downey Jr.',
        role: 'Senior Marketing Lead',
        img: img3,
    },
];

const Section3ABOUT = () => {
    return (
        <section className='max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 animate-fade-in-up'>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                grabCursor={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }} className='team-swiper'>
                {teamMembers.map((member) => (
                    <SwiperSlide key={member.id}>
                        <div className='group flex flex-col'>
                            <div className='w-full h-[380px] sm:h-[430px] bg-[#F5F5F5] rounded-md overflow-hidden flex items-end justify-center pt-6'>
                                <img src={member.img} alt={member.name} className='h-full w-auto max-w-full object-contain object-bottom transition-transform duration-300 ease-out group-hover:-translate-y-2'/>
                            </div>
                            <h3 className='text-2xl sm:text-3xl font-semibold tracking-normal text-black mt-5'>{member.name}</h3>
                            <p className='text-sm sm:text-base text-neutral-600 font-normal mt-1'>{member.role}</p>
                            <div className='flex items-center gap-4 mt-3 text-black'>
                                <a href="#" aria-label="Twitter" className='hover:text-[#DB4444] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0'><TwitterIcon className='size-4 sm:size-5' /></a>
                                <a href="#" aria-label="Instagram" className='hover:text-[#DB4444] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0'><InstagramIcon className='size-4 sm:size-5' /></a>
                                <a href="#" aria-label="LinkedIn" className='hover:text-[#DB4444] transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0'><LinkedinIcon className='size-4 sm:size-5' /></a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Section3ABOUT;
