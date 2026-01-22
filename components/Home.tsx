"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import Flower3DScroll from "@/components/Flower3DScroll";
import { motion, useInView } from "motion/react";
import CountUp from "@/components/CountUp";
import { getDaysSince } from "../app/utils/date";
import DarkVeil from "@/components/DarkVeil";
import StaggeredMenu from "@/components/StaggeredMenu";

export default function Home() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const START_DATE = "2025-03-20";
    const daysSince = getDaysSince(START_DATE);

    const menuItems = [
        {
            label: "Home",
            ariaLabel: "Go to home",
            link: "/",
            onClick: () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },
        {
            label: "Games",
            ariaLabel: "View our journey timeline",
            link: "/games",
            onClick: () => {
                const section = document.querySelector('section:nth-of-type(4)');
                section?.scrollIntoView({ behavior: 'smooth' });
            }
        },
    ];

    const socialItems = [
        { label: "Instagram", link: "https://instagram.com/@bintang.ydha_" },
        { label: "TikTok", link: "https://tiktok.com/@bintangyudha_" }
    ];

    const inView = useInView(sectionRef, {
        once: true,
        margin:
            typeof window !== "undefined" && window.innerWidth < 768
                ? "90% 0px"
                : "-10% 0px",
    });

    return (
        <div className="relative min-h-screen overflow-hidden">

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

            {/* ===== STAGGERED MENU ===== */}
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#ffffff"
                openMenuButtonColor="#B19EEF"
                changeMenuColorOnOpen={true}
                colors={['#1a1a1a', '#2d2d2d', '#3d3d3d']}
                accentColor="#B19EEF"
                isFixed={true}
                closeOnClickAway={true}
            />

            {/* ===== CONTENT ===== */}
            <div
                ref={scrollContainerRef}
                id="scroll-container"
                className="z-10 h-screen overflow-auto"
            >
                <div className="mx-auto flex flex-col min-h-[300vh] items-center justify-center">

                    {/* SECTION 1 - HERO */}
                    <section
                        id="home"
                        className="h-screen w-full flex items-center justify-center flex-col gap-6 relative overflow-hidden"
                    >
                        <div className="text-center z-20">
                            <h1 className="text-white text-4xl md:text-6xl mb-4 font-bold">
                                Hello There!
                            </h1>
                            <p className="text-gray-400 text-lg">Scroll down to explore...</p>
                        </div>
                        <div className="animate-bounce mt-12 z-20">
                            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
                            </div>
                        </div>

                        {/* 3D ROTATING FLOWER - Pink Rose */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, 360]}
                            rotateX={[-30, 30]}
                            translateZ={[-150, 150]}
                            from={{ x: -300, opacity: 0.3 }}
                            to={{ x: 300, opacity: 0.8 }}
                            scale={[0.5, 1.2]}
                            start="top top"
                            end="bottom top"
                            scrub={1.5}
                            blur={true}
                            perspective={1200}
                            className="absolute left-1/4 top-1/3 -z-10"
                        >
                            <img
                                src="/images/tulip.png"
                                alt="Pink flower"
                                className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-full opacity-60"
                                style={{
                                    filter: "drop-shadow(0 0 80px rgba(236, 72, 153, 0.6))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 2 */}
                    <section className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl text-center z-20"
                        >
                            Helloo, tikk!!
                        </ScrollReveal>

                        {/* 3D SUNFLOWER - Flip and rotate */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[0, 360]}
                            rotateY={[0, 180]}
                            rotateZ={[0, 360]}
                            translateZ={[-200, 200]}
                            opacity={[0.3, 0.8]}
                            scale={[0.4, 1.3]}
                            start="top bottom"
                            end="bottom top"
                            scrub={2}
                            blur={true}
                            perspective={1400}
                            className="absolute right-10 md:right-20 top-1/4 -z-10"
                        >
                            <img
                                src="/images/flower-pink.png"
                                alt="Sunflower"
                                className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full opacity-50"
                                style={{
                                    filter: "drop-shadow(0 0 100px rgb(253, 172, 172)",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 3 */}
                    <section className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-2xl md:text-3xl text-center z-20"
                        >
                            I just want to say about something, hmmm...
                        </ScrollReveal>

                        {/* 3D LAVENDER - Rotating depth */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, 720]}
                            rotateX={[-45, 45]}
                            translateZ={[-250, 250]}
                            from={{ y: 200, x: -200 }}
                            to={{ y: -150, x: 200 }}
                            opacity={[0.2, 0.7]}
                            scale={[0.5, 1.1]}
                            scrub={2}
                            blur={true}
                            perspective={1300}
                            className="absolute left-10 top-1/3 -z-10"
                        >
                            <img
                                src="/images/rose-floral.png"
                                alt="Lavender"
                                className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full opacity-55"
                                style={{
                                    filter: "drop-shadow(0 0 90px rgba(168, 85, 247, 0.6))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 4 - COUNT UP */}
                    <section
                        id="journey"
                        ref={sectionRef}
                        className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden"
                    >
                        <div className="text-center space-y-8 z-20">
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
                                className="flex flex-col items-center justify-center gap-2"
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <CountUp
                                        from={0}
                                        to={daysSince}
                                        duration={1.5}
                                        startWhen={inView}
                                        className="text-white text-4xl md:text-6xl font-bold"
                                    />
                                    <p className="text-white text-4xl md:text-6xl font-bold">Days</p>
                                </div>
                                <p className="text-white/60 text-sm">*Live days</p>
                            </motion.div>

                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={8}
                                textClassName="text-white text-sm md:text-lg"
                            >
                                Some things stayed longer than expected
                            </ScrollReveal>

                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={8}
                                textClassName="text-white text-xl md:text-2xl"
                            >
                                Sebelumnya gue gabisa bilang ini ke lu, but.. maybe this is the good time buat bilang ini, karena dikit lagi kita lulus, gue gamau buang buang waktu sihh wkakwakw
                            </ScrollReveal>
                        </div>

                        {/* 3D SPIRAL FLOWERS - Counter rotation */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[0, 360]}
                            rotateY={[0, 360]}
                            rotateZ={[0, 360]}
                            translateZ={[-200, 200]}
                            from={{ x: -200, y: -150 }}
                            to={{ x: 200, y: 150 }}
                            opacity={[0.25, 0.75]}
                            scale={[0.4, 1.1]}
                            scrub={1.5}
                            blur={true}
                            perspective={1400}
                            className="absolute left-1/4 top-1/4 -z-10"
                        >
                            <img
                                src="/images/tulip.png"
                                alt="Red rose"
                                className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full opacity-50"
                                style={{
                                    filter: "drop-shadow(0 0 70px rgba(239, 68, 68, 0.7))",
                                }}
                            />
                        </Flower3DScroll>

                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[0, -360]}
                            rotateY={[0, -360]}
                            rotateZ={[0, -360]}
                            translateZ={[-200, 200]}
                            from={{ x: 200, y: -150 }}
                            to={{ x: -200, y: 150 }}
                            opacity={[0.25, 0.75]}
                            scale={[0.4, 1.1]}
                            scrub={1.5}
                            blur={true}
                            perspective={1400}
                            className="absolute right-1/4 top-1/4 -z-10"
                        >
                            <img
                                src="/images/tulip.png"
                                alt="Cherry blossom"
                                className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full opacity-50"
                                style={{
                                    filter: "drop-shadow(0 0 70px rgba(244, 114, 182, 0.7))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* MESSAGE SECTIONS */}
                    {[
                        "So, yeah, gue suka sama lu, tikk..",
                        "Sorry kalo kesannya tiba-tiba banget...",
                        "DAN SEBENERNYA LU JUGA UDAH TAU KAN YAA?? *gatau sihh kata orang orang sih gitu yaa hahaha",
                        "Even lu udah tau, gue masih mau bilang ini dengan cara dan style gue sendiri yang keren ini",
                        "And after this... after lu baca ini, gue harap kita masih bisa berteman baik yaa, dan anggep aja ini cuma candaan dan anggep aja ini gapernah kejadian/dibuat sebelumnya✌️",
                        "Mungkin gini aja sih... thanks ya tikk! thanks udah jadi motivasi belajar pk pm gue *lebay",
                    ].map((text, i) => (
                        <section
                            id={i === 0 ? "message" : undefined}
                            key={i}
                            className="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden"
                        >
                            <ScrollReveal
                                scrollContainerRef={scrollContainerRef}
                                enableBlur
                                baseOpacity={0.1}
                                blurStrength={4}
                                textClassName="text-white text-xl md:text-3xl text-center leading-relaxed z-20"
                            >
                                {text}
                            </ScrollReveal>

                            {/* Alternating 3D flowers */}
                            {i % 2 === 0 ? (
                                <Flower3DScroll
                                    containerRef={scrollContainerRef}
                                    rotateY={[-180, 180]}
                                    rotateX={[-45, 45]}
                                    translateZ={[-100, 100]}
                                    from={{ x: -150 }}
                                    to={{ x: 150 }}
                                    opacity={[0.2, 0.6]}
                                    scale={[0.5, 1]}
                                    scrub={1.5}
                                    blur={true}
                                    perspective={1200}
                                    className="absolute left-5 md:left-10 top-1/2 -z-10"
                                >
                                    <img
                                        src="/images/blue-floral.png"
                                        alt="White daisy"
                                        className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full opacity-50"
                                        style={{
                                            filter: "drop-shadow(0 0 60px rgba(255, 255, 255, 0.5))",
                                        }}
                                    />
                                </Flower3DScroll>
                            ) : (
                                <Flower3DScroll
                                    containerRef={scrollContainerRef}
                                    rotateY={[180, -180]}
                                    rotateX={[45, -45]}
                                    translateZ={[-100, 100]}
                                    from={{ x: 150 }}
                                    to={{ x: -150 }}
                                    opacity={[0.2, 0.6]}
                                    scale={[0.5, 1]}
                                    scrub={1.5}
                                    blur={true}
                                    perspective={1200}
                                    className="absolute right-5 md:right-10 top-1/2 -z-10"
                                >
                                    <img
                                        src="/images/flower-pink.png"
                                        alt="Pink flower"
                                        className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full opacity-50"
                                        style={{
                                            filter: "drop-shadow(0 0 60px rgba(236, 72, 153, 0.5))",
                                        }}
                                    />
                                </Flower3DScroll>
                            )}
                        </section>
                    ))}

                    {/* FINAL SECTION */}
                    <section
                        id="memories"
                        className="h-screen w-full flex items-center justify-center flex-col gap-8 relative overflow-hidden"
                    >

                        <p className="text-white text-center">
                                Btw ada gamesnya juga tauu.. gamau nyobain kahh?? hehehehe, kalo mau nyobain klik menu aja yhh
                        </p>

                        <div className="text-center space-y-4 z-20">
                            <p className="text-gray-500 text-sm mt-8">
                                #bintangtampilbeda #bintangkeren
                            </p>
                        </div>
                        

                        {/* Decorative elements */}
                        <div className="flex gap-4 mt-12 z-20">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-white/30 animate-pulse"
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}