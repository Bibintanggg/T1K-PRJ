"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SketchfabScrollProps {
    modelId: string;
    containerRef?: React.RefObject<HTMLElement>;
    // Scroll animation
    start?: string;
    end?: string;
    scrub?: boolean | number;
    // Position & styling
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    opacity?: [number, number];
    scale?: [number, number];
    rotate?: [number, number];
    className?: string;
    // Sketchfab options
    autostart?: boolean;
    transparent?: boolean;
    ui_stop?: boolean;
    ui_hint?: boolean;
}

export default function SketchfabScroll({
    modelId,
    containerRef,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    from = {},
    to = {},
    opacity = [0.3, 1],
    scale = [0.5, 1],
    rotate = [0, 0],
    className = "",
    autostart = true,
    transparent = true,
    ui_stop = false,
    ui_hint = false,
}: SketchfabScrollProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                wrapperRef.current,
                {
                    opacity: opacity[0],
                    scale: scale[0],
                    rotation: rotate[0],
                    ...from,
                },
                {
                    opacity: opacity[1],
                    scale: scale[1],
                    rotation: rotate[1],
                    ...to,
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: start,
                        end: end,
                        scrub: scrub,
                        scroller: containerRef?.current || undefined,
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [start, end, scrub, containerRef, opacity, scale, rotate, from, to]);

    // Build Sketchfab URL with options
    const sketchfabUrl = `https://sketchfab.com/models/${modelId}/embed?${new URLSearchParams({
        autostart: autostart ? '1' : '0',
        transparent: transparent ? '1' : '0',
        ui_stop: ui_stop ? '1' : '0',
        ui_hint: ui_hint ? '1' : '0',
        ui_controls: '0',
        ui_infos: '0',
        ui_inspector: '0',
        ui_watermark: '0',
        ui_help: '0',
        ui_settings: '0',
        ui_vr: '0',
        ui_fullscreen: '0',
        ui_annotations: '0',
    })}`;

    return (
        <div ref={wrapperRef} className={className}>
            <iframe
                title="Sketchfab 3D Model"
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={sketchfabUrl}
                style={{
                    pointerEvents: 'none', // Prevent interaction
                }}
            />
        </div>
    );
}