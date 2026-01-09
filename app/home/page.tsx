// app/page.tsx
"use client";

import { useRef } from 'react';
import PillNav from "@/components/PillNav";
import logo from "@/public/Images/logo.png";
import ScrollReveal from '@/components/ScrollReveal';
import { Gamepad, HomeIcon } from 'lucide-react';
import Dock from '@/components/Dock';

export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const items = [
        { icon: <HomeIcon size={18} />, label: 'Home', onClick: () => alert('Home!') },
        { icon: <Gamepad size={18} />, label: 'Games', onClick: () => alert('Archive!') },
    ];
    return (
        <div
            className="bg-black min-h-screen overflow-auto"
            ref={scrollContainerRef}
            id="scroll-container"
            style={{ height: '100vh', overflow: 'auto' }}
        >
            <div className="items-center justify-center mx-auto flex flex-col min-h-[300vh]">

                <Dock
                    items={items}
                    panelHeight={68}
                    baseItemSize={50}
                    magnification={70}
                    className='mb-20'
                />

                {/* Section 1 - Spacer */}
                <section className="h-screen w-full flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-white text-4xl mb-4">↓ Scroll Down ↓</h1>
                        <p className="text-gray-400">Untuk melihat kelanjutannya</p>
                    </div>
                </section>


                {/* Section 3 - More content */}
                <section className="min-h-screen w-full flex items-center justify-center px-4">
                    <div className="max-w-4xl">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur={true}
                            baseOpacity={0.1}
                            blurStrength={8}
                            containerClassName="text-center"
                            textClassName="text-white text-2xl md:text-3xl"
                        >
                            This is another text to test the scroll reveal animation.
                            Scroll down to see more effects!
                        </ScrollReveal>
                    </div>
                </section>
                
                <section className="min-h-screen w-full flex items-center justify-center px-4">
                    <div className="max-w-4xl">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur={true}
                            baseOpacity={0.1}
                            blurStrength={8}
                            containerClassName="text-center"
                            textClassName="text-white text-2xl md:text-3xl"
                        >
                            This is another text to test the scroll reveal animation.
                            Scroll down to see more effects!
                        </ScrollReveal>
                    </div>
                </section>

                {/* Section 4 - Final spacer */}
                <section className="h-screen w-full flex items-center justify-center">
                    <p className="text-gray-500">End of content</p>
                </section>

            </div>
        </div>
    );
}