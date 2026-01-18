"use client";

import { useRef } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { Gamepad, HomeIcon } from 'lucide-react';
import Dock from '@/components/Dock';
import { motion, useInView } from "motion/react";
import CountUp from "@/components/CountUp";
import { getDaysSince } from '../app/utils/date';


export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const START_DATE = "2025-03-20";
    const daysSince = getDaysSince(START_DATE)

    const items = [
        { icon: <HomeIcon size={18} />, label: 'Home', onClick: () => alert('Home!') },
        { icon: <Gamepad size={18} />, label: 'Games', onClick: () => alert('Archive!') },
    ];

    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, {
        once: true,
        margin: typeof window !== "undefined" && window.innerWidth < 768
            ? "15% 0px"
            : "-10% 0px",
    });

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
                        <h1 className="text-white text-4xl mb-4">Scroll Down</h1>
                        <p className="text-gray-400">Scroll pelan pelan aja ya</p>
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
                            Helloo, tikk!!
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
                            I just want to say about something,  hmmm...
                        </ScrollReveal>
                    </div>
                </section>

                <section
                    ref={sectionRef}
                    className="min-h-screen w-full flex items-center justify-center px-4"
                >
                    <div className="max-w-4xl text-center space-y-6">

                        {/* Text */}
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl"
                        >
                            Maybe after some time
                        </ScrollReveal>

                        {/* CountUp + Blur */}
                        <div className="flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, filter: "blur(8px)" }}
                                animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="flex items-center gap-4 justify-center"
                            >
                                <CountUp
                                    from={0}
                                    to={daysSince}
                                    duration={1.5}
                                    startWhen={inView}
                                    className="text-white text-4xl font-bold"
                                />

                                <p className="text-white text-4xl font-bold">Days</p>
                            </motion.div>

                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={8}
                                textClassName="text-white text-sm md:text-lg"
                            >
                                some things stayed longer than expected
                            </ScrollReveal>
                        </div>

                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl"
                        >
                            Sebelumnya gue gabisa bilang ini ke lu, but.. maybe this is the good time buat bilang
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
                            So,yeah, gue suka sama lu, tikk..
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
                            Sorry kalo kesannya tiba tibaa bangettt..to be honest, gue mau bilang ini sebenernya dari lama.. tapi karena ada lain hal, makanya baru sekarang dehh hahaha
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
                            DAN SEBENERNYA LU JUGA UDAH TAU KAN YAA?? *kata orang sih begituu hahaha
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
                            textClassName="text-white text-xl md:text-3xl"
                        >
                            Even lu udah tau, gue masih mau bilang ini ke lu hehehe, bilang dengan cara dan style gue sendiriii, yaitu dengan website...
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
                            And after this, after lu baca ini, gue harap kita masih bisa tetep berteman baik yaa... dont be awkward and anggep aja nothings happened atau ini tuh gapernah dibuatt hahahah
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
                            Mungkin gini aja siihh... thanks yaa tikk, big thanks untuk jasa lu!!
                        </ScrollReveal>
                    </div>
                </section>

                {/* Section 4 - Final spacer */}
                <section className="h-screen w-full flex items-center justify-center">
                    <p className="text-gray-500">#bintangtampilbeda #bintangkeren</p>
                </section>

            </div>
        </div>
    );
}