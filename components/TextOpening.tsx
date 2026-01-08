"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ShinyText from "./ShinyText";
import LightRays from './LightRays';
import Aurora from './Aurora';

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

        tl.to({}, { duration: 2.5 });

        // Shiny fade out
        tl.to(shinyWrapperRef.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.8,
        });

        tl.to({}, { duration: 0.5 });

        tl.to(containerRef.current, {
            opacity: 0,
            duration: 1,
        });

        tl.call(onFinish);

        return () => {
            split.revert();
            tl.kill();
        };
    }, [onFinish]);

    const containerRef = useRef<HTMLDivElement>(null)
    return (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden" ref={containerRef}>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Aurora
                    colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className="relative z-10 h-full w-full font-sans text-white">

                <h1
                    ref={splitRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
             text-5xl font-bold text-center"
                >
                    HELLO
                </h1>

                <p
                    ref={blurRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2
             text-xl text-center opacity-0"
                >
                    WELCOME TO MY WEBSITE
                </p>

                <div
                    ref={shinyWrapperRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2
             opacity-0 text-center max-w-lg"
                >
                    <ShinyText
                        text="Reminder!"
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
