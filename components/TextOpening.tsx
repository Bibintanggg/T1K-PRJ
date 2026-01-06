"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ShinyText from "./ShinyText";

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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <h1 ref={splitRef} className="text-5xl font-bold text-center">
                HELLO
            </h1>

            <p ref={blurRef} className="mt-6 text-xl text-center opacity-0">
                welcome to my website
            </p>

            <div
                ref={shinyWrapperRef}
                className="mt-6 opacity-0 text-center max-w-lg"
            >
                <ShinyText
                    text="Reminder, coba untuk bukanya pas free and after belajar aja yaa.. kalo semisal masih sibuk, close dulu aja.. GAPAPA!!"
                    speed={5.0}
                    color="#888"
                    shineColor="#fff"
                    className="text-2xl font-semibold text"
                />
            </div>
        </div>
    );
}
