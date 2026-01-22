"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Flower3DScrollProps {
    children: React.ReactNode;
    containerRef?: React.RefObject<HTMLElement | null>;
    // 3D Transform properties
    rotateX?: [number, number];      // Rotate sumbu X (atas-bawah)
    rotateY?: [number, number];      // Rotate sumbu Y (kiri-kanan)
    rotateZ?: [number, number];      // Rotate sumbu Z (normal rotate)
    translateZ?: [number, number];   // Depth (maju-mundur)
    // Position
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    // Scroll trigger config
    start?: string;
    end?: string;
    scrub?: boolean | number;
    // Visual effects
    opacity?: [number, number];
    scale?: [number, number];
    blur?: boolean;
    perspective?: number;            // Perspective untuk 3D effect
    className?: string;
}

export default function Flower3DScroll({
    children,
    containerRef,
    rotateX = [0, 360],
    rotateY = [0, 360],
    rotateZ = [0, 0],
    translateZ = [0, 0],
    from = {},
    to = {},
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    opacity = [0.3, 0.8],
    scale = [0.5, 1],
    blur = true,
    perspective = 1000,
    className = "",
}: Flower3DScrollProps) {
    const objectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!objectRef.current) return;

        const ctx = gsap.context(() => {
            const fromProps = {
                rotateX: rotateX[0],
                rotateY: rotateY[0],
                rotateZ: rotateZ[0],
                z: translateZ[0],
                opacity: opacity[0],
                scale: scale[0],
                ...(blur && { filter: "blur(10px)" }),
                ...from,
            };

            const toProps = {
                rotateX: rotateX[1],
                rotateY: rotateY[1],
                rotateZ: rotateZ[1],
                z: translateZ[1],
                opacity: opacity[1],
                scale: scale[1],
                ...(blur && { filter: "blur(0px)" }),
                ...to,
                scrollTrigger: {
                    trigger: objectRef.current,
                    start: start,
                    end: end,
                    scrub: scrub,
                    scroller: containerRef?.current || undefined,
                },
            };

            gsap.fromTo(objectRef.current, fromProps, toProps);
        });

        return () => ctx.revert();
    }, [rotateX, rotateY, rotateZ, translateZ, opacity, scale, blur, from, to, start, end, scrub, containerRef]);

    return (
        <div
            style={{
                perspective: `${perspective}px`,
                transformStyle: "preserve-3d",
            }}
            className={`${className} pointer-events-none`}
        >
            <div
                ref={objectRef}
                style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                }}
            >
                {children}
            </div>
        </div>
    );
}