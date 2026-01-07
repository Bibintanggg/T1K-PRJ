"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ShinyText from "./ShinyText";
import LightRays from './LightRays';

gsap.registerPlugin(SplitText);

interface TextOpeningProps {
    onFinish: () => void;
}

export default function TextOpening({ onFinish }: TextOpeningProps) {
    const splitRef = useRef<HTMLHeadingElement>(null);
    const blurRef = useRef<HTMLParagraphElement>(null);
    const shinyWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!splitRef.current || !blurRef.current || !shinyWrapperRef.current)
            return;

        const split = new SplitText(splitRef.current, { type: "chars" });

        const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            onComplete: onFinish,
        });

        // Split masuk
        tl.from(split.chars, {
            opacity: 0,
            y: 40,
            stagger: 0.06,
            duration: 1,
        });

        // Split keluar
        tl.to(split.chars, {
            opacity: 0,
            y: -20,
            stagger: 0.04,
            duration: 1,
            delay: 0.8,
        });

        // Blur fade in
        tl.fromTo(
            blurRef.current,
            { opacity: 0, filter: "blur(12px)" },
            { opacity: 1, filter: "blur(0px)", duration: 0.8 }
        );

        // Blur fade out
        tl.to(blurRef.current, {
            opacity: 0,
            duration: 0.6,
            delay: 0.6,
        });

        // Shiny fade in
        tl.to(shinyWrapperRef.current, {
            opacity: 1,
            duration: 0.8,
        });

        // ⏸ TAHAN REMINDER DI LAYAR (INI YANG PENTING)
        tl.to({}, { duration: 2.5 });

        // Shiny fade out
        tl.to(shinyWrapperRef.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.8,
        });

        return () => {
            split.revert();
            tl.kill();
        };
    }, [onFinish]);

    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#FFFF"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="w-full h-full"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">

                <h1 ref={splitRef} className="text-5xl font-bold text-center">
                    HELLO
                </h1>

                <p ref={blurRef} className="text-xl text-center opacity-0">
                    welcome to my website
                </p>

                <div
                    ref={shinyWrapperRef}
                    className="opacity-0 text-center max-w-lg"
                >
                    <ShinyText
                        text="Hii"
                        speed={5.0}
                        color="#888"
                        shineColor="#fff"
                        className="text-2xl font-semibold"
                    />
                </div>

            </div>
        </div>
    );
}
