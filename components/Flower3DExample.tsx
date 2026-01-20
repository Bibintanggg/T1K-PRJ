"use client";

import { useRef } from "react";
import Flower3DScroll from "@/components/Flower3DScroll";
import ScrollReveal from "@/components/ScrollReveal";

export default function Flower3DExample() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-purple-950/30 to-black">
            <div
                ref={scrollContainerRef}
                className="z-10 h-screen overflow-auto"
            >
                <div className="mx-auto flex flex-col min-h-[600vh] items-center justify-center">

                    {/* SECTION 1 - HERO */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <div className="text-center z-20">
                            <h1 className="text-white text-6xl md:text-8xl font-bold mb-4">
                                3D Flowers
                            </h1>
                            <p className="text-gray-400 text-xl">Scroll to see them rotate in 3D</p>
                        </div>

                        {/* FLOATING 3D FLOWER - Rotate Y axis (flip horizontal) */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, 720]}        // 2x full rotation
                            rotateX={[-30, 30]}       // Slight tilt
                            translateZ={[-200, 200]}  // Move forward-backward
                            opacity={[0.4, 0.9]}
                            scale={[0.5, 1.2]}
                            start="top top"
                            end="bottom top"
                            scrub={1.5}
                            blur={true}
                            perspective={1200}
                            className="absolute left-1/4 top-1/3 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=90" 
                                alt="Pink flower"
                                className="w-80 h-80 md:w-[500px] md:h-[500px] object-cover rounded-full opacity-70"
                                style={{
                                    filter: "drop-shadow(0 0 80px rgba(236, 72, 153, 0.6))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 2 - SUNFLOWER FLIP */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-4xl md:text-6xl text-center z-20"
                        >
                            Watch it flip and spin
                        </ScrollReveal>

                        {/* 3D SUNFLOWER - Flip vertical + rotate */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[0, 360]}        // Flip vertical
                            rotateY={[0, 180]}        // Half flip horizontal
                            rotateZ={[0, 360]}        // Spin
                            translateZ={[-300, 300]}
                            opacity={[0.3, 0.85]}
                            scale={[0.4, 1.5]}
                            start="top bottom"
                            end="bottom top"
                            scrub={2}
                            blur={true}
                            perspective={1500}
                            className="absolute right-10 md:right-20 top-1/4 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=1200&q=90" 
                                alt="Sunflower"
                                className="w-96 h-96 md:w-[600px] md:h-[600px] object-cover rounded-full opacity-60"
                                style={{
                                    filter: "drop-shadow(0 0 100px rgba(251, 191, 36, 0.7))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 3 - MULTIPLE 3D FLOWERS */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-4xl md:text-6xl text-center z-20"
                        >
                            Dancing petals in 3D
                        </ScrollReveal>

                        {/* Left - Cherry Blossom (Rotate Y) */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[-180, 180]}
                            rotateX={[-45, 45]}
                            translateZ={[-150, 150]}
                            from={{ x: -500, y: 300 }}
                            to={{ x: -100, y: -300 }}
                            opacity={[0.25, 0.75]}
                            scale={[0.4, 1.3]}
                            scrub={1}
                            blur={true}
                            perspective={1300}
                            className="absolute left-0 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=90" 
                                alt="Cherry blossom"
                                className="w-72 h-72 md:w-[450px] md:h-[450px] object-cover rounded-full opacity-50"
                                style={{
                                    filter: "drop-shadow(0 0 60px rgba(244, 114, 182, 0.5))",
                                }}
                            />
                        </Flower3DScroll>

                        {/* Right - Rose (Rotate X) */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[-180, 180]}
                            rotateY={[45, -45]}
                            translateZ={[-150, 150]}
                            from={{ x: 500, y: 300 }}
                            to={{ x: 100, y: -300 }}
                            opacity={[0.25, 0.75]}
                            scale={[0.4, 1.3]}
                            scrub={1}
                            blur={true}
                            perspective={1300}
                            className="absolute right-0 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=1200&q=90" 
                                alt="Red rose"
                                className="w-72 h-72 md:w-[450px] md:h-[450px] object-cover rounded-full opacity-50"
                                style={{
                                    filter: "drop-shadow(0 0 60px rgba(239, 68, 68, 0.6))",
                                }}
                            />
                        </Flower3DScroll>

                        {/* Center - Lavender (Rotate Z + depth) */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateZ={[0, 720]}
                            rotateX={[-90, 90]}
                            rotateY={[-90, 90]}
                            translateZ={[-250, 250]}
                            from={{ y: -200 }}
                            to={{ y: 200 }}
                            opacity={[0.2, 0.8]}
                            scale={[0.3, 1.5]}
                            scrub={1.5}
                            blur={true}
                            perspective={1200}
                            className="absolute -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=90" 
                                alt="Lavender"
                                className="w-64 h-64 md:w-[400px] md:h-[400px] object-cover rounded-full opacity-60"
                                style={{
                                    filter: "drop-shadow(0 0 70px rgba(168, 85, 247, 0.6))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 4 - SPIRAL 3D EFFECT */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-4xl md:text-6xl text-center z-20"
                        >
                            Spiral into beauty
                        </ScrollReveal>

                        {/* SPIRAL FLOWER - All axis rotation */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateX={[0, 1080]}       // 3x rotation
                            rotateY={[0, 1080]}       // 3x rotation
                            rotateZ={[0, 1080]}       // 3x rotation
                            translateZ={[-400, 400]}
                            opacity={[0.2, 0.95]}
                            scale={[0.2, 2]}
                            start="top bottom"
                            end="bottom top"
                            scrub={2}
                            blur={true}
                            perspective={2000}
                            className="absolute -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=90" 
                                alt="Pink flower"
                                className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-cover rounded-full opacity-40"
                                style={{
                                    filter: "drop-shadow(0 0 120px rgba(236, 72, 153, 0.8))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* SECTION 5 - CAROUSEL EFFECT */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <ScrollReveal
                            scrollContainerRef={scrollContainerRef}
                            enableBlur
                            baseOpacity={0.1}
                            blurStrength={8}
                            textClassName="text-white text-4xl md:text-6xl text-center z-20"
                        >
                            Carousel of flowers
                        </ScrollReveal>

                        {/* Flower 1 - coming forward */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, 360]}
                            translateZ={[-500, 100]}
                            from={{ x: -300 }}
                            to={{ x: 0 }}
                            opacity={[0.1, 0.9]}
                            scale={[0.3, 1.2]}
                            scrub={1.5}
                            blur={true}
                            perspective={1500}
                            className="absolute left-1/4 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=1200&q=90" 
                                alt="Sunflower"
                                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full opacity-70"
                                style={{
                                    filter: "drop-shadow(0 0 60px rgba(251, 191, 36, 0.6))",
                                }}
                            />
                        </Flower3DScroll>

                        {/* Flower 2 - going backward */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, -360]}
                            translateZ={[100, -500]}
                            from={{ x: 0 }}
                            to={{ x: 300 }}
                            opacity={[0.9, 0.1]}
                            scale={[1.2, 0.3]}
                            scrub={1.5}
                            blur={true}
                            perspective={1500}
                            className="absolute right-1/4 -z-10"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=90" 
                                alt="White flower"
                                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full opacity-70"
                                style={{
                                    filter: "drop-shadow(0 0 60px rgba(255, 255, 255, 0.5))",
                                }}
                            />
                        </Flower3DScroll>
                    </section>

                    {/* FINAL SECTION - BOUQUET 3D */}
                    <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
                        <div className="text-center z-20 px-4">
                            <h2 className="text-white text-6xl md:text-8xl font-bold mb-6">
                                Beautiful 3D Flowers! 🌸
                            </h2>
                            <p className="text-gray-300 text-2xl">
                                Transparent & rotating in 3D space
                            </p>
                        </div>

                        {/* Final 3D Bouquet */}
                        <Flower3DScroll
                            containerRef={scrollContainerRef}
                            rotateY={[0, 360]}
                            rotateX={[-45, 45]}
                            rotateZ={[0, 180]}
                            translateZ={[-300, 300]}
                            opacity={[0.2, 1]}
                            scale={[0.3, 1.8]}
                            start="top bottom"
                            end="center center"
                            scrub={2}
                            blur={true}
                            perspective={2000}
                            className="absolute -z-10"
                        >
                            <div className="flex gap-8 md:gap-12">
                                <img 
                                    src="https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=800&q=80" 
                                    alt="Red rose"
                                    className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full opacity-60"
                                    style={{
                                        filter: "drop-shadow(0 0 80px rgba(239, 68, 68, 0.7))",
                                    }}
                                />
                                <img 
                                    src="https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=800&q=80" 
                                    alt="Sunflower"
                                    className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full opacity-60"
                                    style={{
                                        filter: "drop-shadow(0 0 80px rgba(251, 191, 36, 0.7))",
                                    }}
                                />
                                <img 
                                    src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" 
                                    alt="Cherry blossom"
                                    className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full opacity-60"
                                    style={{
                                        filter: "drop-shadow(0 0 80px rgba(244, 114, 182, 0.7))",
                                    }}
                                />
                            </div>
                        </Flower3DScroll>
                    </section>

                </div>
            </div>
        </div>
    );
}