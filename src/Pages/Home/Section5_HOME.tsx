import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Float } from '@react-three/drei';
import { NavLink } from 'react-router-dom';

function SpeakerModel() {
    const { scene } = useGLTF('/Column.glb');
    return (
        <Center>
            <primitive object={scene} rotation={[0.08, -0.45, 0]} scale={1.8} />
        </Center>
    );
}

useGLTF.preload('/Column.glb');

const Section5HOME = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        days: 5,
        minutes: 59,
        seconds: 35
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => String(n).padStart(2, '0');

    const timeItems = [
        { value: pad(timeLeft.hours), label: 'Hours' },
        { value: pad(timeLeft.days), label: 'Days' },
        { value: pad(timeLeft.minutes), label: 'Minutes' },
        { value: pad(timeLeft.seconds), label: 'Seconds' }
    ];

    return (
        <section className="max-w-[1240px] mx-auto px-4 py-8 sm:py-14">
            <div className="bg-black text-white rounded-lg p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden relative">
                {/* Left Content */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-lg z-10">
                    <span className="text-[#00FF66] font-semibold text-sm sm:text-base tracking-wide">Categories</span>

                    <h2 className="text-3xl sm:text-5xl lg:text-5xl font-semibold tracking-tight leading-tight sm:leading-[1.2]">Enhance Your Music Experience</h2>

                    {/* Countdown Circles */}
                    <div className="flex items-center gap-3 sm:gap-4 my-2">
                        {timeItems.map((item, idx) => (
                            <div key={idx} className="size-14 sm:size-16 rounded-full bg-white text-black flex flex-col items-center justify-center shadow-sm shrink-0">
                                <span className="font-bold text-sm sm:text-base leading-tight">{item.value}</span>
                                <span className="text-[10px] sm:text-[11px] font-normal leading-tight">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Buy Now Button */}
                    <NavLink to="#">
                        <button type="button" className="bg-[#00FF66] text-black font-semibold text-sm sm:text-base px-10 py-3.5 rounded hover:bg-[#00e65c] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-[#00FF66]/20 mt-2">Buy Now!</button>
                    </NavLink>
                </div>

                {/* Right Interactive 3D Model */}
                <div className="w-full lg:w-[500px] h-[280px] sm:h-[360px] lg:h-[400px] relative flex items-center justify-center">
                    {/* Brighter studio spotlight glow behind speaker */}
                    <div className="absolute w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.28)_0%,_rgba(200,200,200,0.15)_40%,_rgba(0,0,0,0)_70%)] blur-2xl pointer-events-none" />

                    <Canvas camera={{ position: [0, 0, 1.8], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
                        <ambientLight intensity={2.2} />
                        <directionalLight position={[5, 5, 5]} intensity={2.8} />
                        <directionalLight position={[-5, 3, 3]} intensity={2} />
                        <pointLight position={[0, 0, 2.5]} intensity={1.8} />
                        <Suspense fallback={null}>
                            <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
                                <SpeakerModel />
                            </Float>
                            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Section5HOME;
