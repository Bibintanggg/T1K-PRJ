"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Gamepad, HomeIcon } from "lucide-react";
import Dock from "@/components/Dock";
import { motion, useInView } from "motion/react";
import CountUp from "@/components/CountUp";
import { getDaysSince } from "../app/utils/date";
import DarkVeil from "@/components/DarkVeil";

export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const START_DATE = "2025-03-20";
    const daysSince = getDaysSince(START_DATE);

    const items = [
        { icon: <HomeIcon size={18} />, label: "Home", onClick: () => alert("Home!") },
        { icon: <Gamepad size={18} />, label: "Games", onClick: () => alert("Archive!") },
    ];

    const inView = useInView(sectionRef, {
        once: true,
        margin:
            typeof window !== "undefined" && window.innerWidth < 768
                ? "15% 0px"
                : "-10% 0px",
    });

    return (
        <div className="relative min-h-screen overflow-hidden">

            {/* ===== DARKVEIL BACKGROUND ===== */}
            <div className="fixed inset-0 -z-20">
                <DarkVeil
                    hueShift={67}
                    noiseIntensity={0.13}
                    scanlineIntensity={0.86}
                    speed={2.8}
                    scanlineFrequency={4}
                    warpAmount={5}
                />
            </div>

            <div className="fixed inset-0 bg-black/60 -z-10" />

            {/* ===== CONTENT ===== */}
            <div
                ref={scrollContainerRef}
                id="scroll-container"
                className=" z-10 h-screen overflow-auto"
            >
                <div className="mx-auto flex flex-col min-h-[300vh] items-center justify-center">

                    <Dock
                        items={items}
                        panelHeight={68}
                        baseItemSize={50}
                        magnification={70}
                        className="mb-20"
                    />

                    {/* SECTION 1 */}
                    <section className="h-screen w-full flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-white text-4xl mb-4">Scroll Down</h1>
                            <p className="text-gray-400">Scroll pelan pelan aja ya</p>
                        </div>
                    </section>

                    {/* SECTION 2 */}
                    <section className="min-h-screen w-full flex items-center justify-center px-4">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl text-center"
                        >
                            Helloo, sir!!
                        </ScrollReveal>
                    </section>

                    <section className="min-h-screen w-full flex items-center justify-center px-4">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl text-center"
                        >
                            I just want to say about something, hmmm...
                        </ScrollReveal>
                    </section>

                    {/* COUNT UP SECTION */}
                    <section
                        ref={sectionRef}
                        className="min-h-screen w-full flex items-center justify-center px-4"
                    >
                        <div className="text-center space-y-6">

                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={8}
                                textClassName="text-white text-2xl md:text-3xl"
                            >
                                Maybe after some time
                            </ScrollReveal>

                            <motion.div
                                initial={{ opacity: 0, filter: "blur(8px)" }}
                                animate={inView ? { opacity: 1, filter: "blur(0px)" } : {}}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="flex items-center justify-center gap-4"
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
                    </section>

                    {/* TEXT SECTIONS */}
                    {[
                        "Sebelumnya gue gabisa bilang ini ke lu, but.. maybe this is the good time buat bilang",
                        "So, yeah, gue suka sama lu, sir..",
                        "Sorry kalo kesannya tiba-tiba banget...",
                        "DAN SEBENERNYA LU JUGA UDAH TAU KAN??",
                        "Even lu udah tau, gue masih mau bilang ini dengan cara gue sendiri",
                        "And after this... gue harap kita masih bisa berteman baik ya",
                        "Mungkin gini aja sih... thanks ya sirr!",
                    ].map((text, i) => (
                        <section
                            key={i}
                            className="min-h-screen w-full flex items-center justify-center px-4"
                        >
                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={8}
                                textClassName="text-white text-xl md:text-3xl text-center"
                            >
                                {text}
                            </ScrollReveal>
                        </section>
                    ))}

                    {/* FINAL */}
                    <section className="h-screen w-full flex items-center justify-center">
                        <p className="text-gray-400">
                            #bintangtampilbeda #bintangkeren
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
