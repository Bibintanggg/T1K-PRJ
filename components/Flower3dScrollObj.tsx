"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Scroll3DModelProps {
    objPath: string;
    scale?: number;
    color?: string;
    scrollRotationMultiplier?: number;
}

// 3D Model yang controlled by scroll
function Scroll3DModel({
    objPath,
    scale = 1,
    color = "#ff69b4",
    scrollRotationMultiplier = 1,
}: Scroll3DModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const scrollProgress = useRef(0);
    
    const obj = useLoader(OBJLoader, objPath);

    // Update rotation based on scroll progress
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y = scrollProgress.current * Math.PI * 2 * scrollRotationMultiplier;
            meshRef.current.rotation.x = scrollProgress.current * Math.PI * 0.5;
        }
    });

    useEffect(() => {
        // This will be controlled by GSAP from parent component
        return () => {};
    }, []);

    return (
        <group ref={meshRef} scale={scale}>
            <primitive object={obj}>
                <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
            </primitive>
        </group>
    );
}

// Loading placeholder
function LoadingPlaceholder() {
    return (
        <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#666" wireframe />
        </mesh>
    );
}

interface Flower3DScrollObjProps {
    objPath: string;
    containerRef?: React.RefObject<HTMLElement>;
    // Model properties
    scale?: number;
    color?: string;
    // Scroll animation
    start?: string;
    end?: string;
    scrub?: boolean | number;
    // 3D rotation
    scrollRotationMultiplier?: number;
    // Position & styling
    className?: string;
    canvasClassName?: string;
}

export default function Flower3DScrollObj({
    objPath,
    containerRef,
    scale = 2,
    color = "#ff69b4",
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    scrollRotationMultiplier = 2,
    className = "",
    canvasClassName = "w-full h-full",
}: Flower3DScrollObjProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef({ value: 0 });

    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            gsap.to(scrollProgressRef.current, {
                value: 1,
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: start,
                    end: end,
                    scrub: scrub,
                    scroller: containerRef?.current || undefined,
                    onUpdate: (self) => {
                        scrollProgressRef.current.value = self.progress;
                    },
                },
            });
        });

        return () => ctx.revert();
    }, [start, end, scrub, containerRef]);

    return (
        <div ref={wrapperRef} className={className}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                className={canvasClassName}
                style={{ background: "transparent" }}
            >
                {/* Enhanced lighting for better flower visibility */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.2} />
                <pointLight position={[-10, -10, -5]} intensity={0.7} color="#ff69b4" />
                <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} />

                <Suspense fallback={<LoadingPlaceholder />}>
                    <Scroll3DModel
                        objPath={objPath}
                        scale={scale}
                        color={color}
                        scrollRotationMultiplier={scrollRotationMultiplier}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}