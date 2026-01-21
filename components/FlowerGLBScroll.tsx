"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface GLBModelProps {
    modelPath: string;
    scrollProgressRef: React.MutableRefObject<{ value: number }>;
    positionProgressRef: React.MutableRefObject<{ 
        x: number; 
        y: number; 
        scale: number;
    }>;
    rotationMultiplier?: { x: number; y: number; z: number };
    startPosition?: { x: number; y: number; scale: number };
    endPosition?: { x: number; y: number; scale: number };
}

// 3D GLB Model controlled by scroll
function GLBModel({
    modelPath,
    scrollProgressRef,
    positionProgressRef,
    rotationMultiplier = { x: 0.5, y: 2, z: 0 },
    startPosition = { x: -3, y: 0, scale: 0.5 }, // AWAL: kiri, kecil
    endPosition = { x: 3, y: 0, scale: 2 },     // AKHIR: kanan, besar
}: GLBModelProps) {
    const meshRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(modelPath);

    // Clone scene to avoid reuse issues
    const clonedScene = scene.clone();

    // Update rotation and position based on scroll progress
    useFrame(() => {
        if (meshRef.current) {
            const progress = scrollProgressRef.current.value;
            const posProgress = positionProgressRef.current;
            
            // Rotation (dari scroll progress)
            meshRef.current.rotation.x = progress * Math.PI * 2 * rotationMultiplier.x;
            meshRef.current.rotation.y = progress * Math.PI * 2 * rotationMultiplier.y;
            meshRef.current.rotation.z = progress * Math.PI * 2 * rotationMultiplier.z;
            
            // Position movement dengan lerp
            meshRef.current.position.x = startPosition.x + (endPosition.x - startPosition.x) * posProgress.x;
            meshRef.current.position.y = startPosition.y + (endPosition.y - startPosition.y) * posProgress.y;
            
            // Scale animation
            const targetScale = startPosition.scale + (endPosition.scale - startPosition.scale) * posProgress.scale;
            meshRef.current.scale.setScalar(targetScale);
        }
    });

    return (
        <group ref={meshRef}>
            <primitive object={clonedScene} />
        </group>
    );
}

// Loading placeholder
function LoadingPlaceholder() {
    return (
        <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ff69b4" wireframe />
        </mesh>
    );
}

interface FlowerGLBScrollProps {
    modelPath: string;
    containerRef?: React.RefObject<HTMLElement>;
    // Scroll animation
    start?: string;
    end?: string;
    scrub?: boolean | number;
    // 3D rotation multipliers
    rotationMultiplier?: { x: number; y: number; z: number };
    // Camera
    cameraPosition?: [number, number, number];
    // Movement settings
    moveFrom?: { x?: number; y?: number; scale?: number };
    moveTo?: { x?: number; y?: number; scale?: number };
    // Lighting
    lightIntensity?: number;
    ambientIntensity?: number;
    // Position & styling
    className?: string;
    canvasClassName?: string;
}

export default function FlowerGLBScroll({
    modelPath,
    containerRef,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
    rotationMultiplier = { x: 0.5, y: 2, z: 0 },
    cameraPosition = [0, 0, 10],
    moveFrom = { x: -3, y: 0, scale: 0.5 }, // Default: mulai dari kiri, kecil
    moveTo = { x: 3, y: 0, scale: 2 },     // Default: pindah ke kanan, besar
    lightIntensity = 1.5,
    ambientIntensity = 0.8,
    className = "",
    canvasClassName = "w-full h-full",
}: FlowerGLBScrollProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const scrollProgressRef = useRef({ value: 0 });
    const positionProgressRef = useRef({ 
        x: 0, 
        y: 0, 
        scale: 0 
    });

    useEffect(() => {
        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            // Animation for rotation
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

            // Animation untuk movement (X, Y, Scale) dengan timing yang sama
            gsap.to(positionProgressRef.current, {
                x: 1,
                y: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: start,
                    end: end,
                    scrub: scrub,
                    scroller: containerRef?.current || undefined,
                },
            });
        });

        return () => ctx.revert();
    }, [start, end, scrub, containerRef]);

    return (
        <div ref={wrapperRef} className={className}>
            <Canvas
                camera={{ position: cameraPosition, fov: 50 }}
                className={canvasClassName}
                style={{ background: "transparent" }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Enhanced lighting for flowers */}
                <ambientLight intensity={ambientIntensity} />
                <directionalLight 
                    position={[5, 5, 5]} 
                    intensity={lightIntensity}
                    castShadow
                />
                <directionalLight 
                    position={[-5, -5, -5]} 
                    intensity={lightIntensity * 0.5}
                />
                <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />
                <spotLight 
                    position={[10, 10, 10]} 
                    angle={0.3} 
                    intensity={0.5}
                    penumbra={1}
                />

                <Suspense fallback={<LoadingPlaceholder />}>
                    <GLBModel
                        modelPath={modelPath}
                        scrollProgressRef={scrollProgressRef}
                        positionProgressRef={positionProgressRef}
                        rotationMultiplier={rotationMultiplier}
                        startPosition={{
                            x: moveFrom.x || -3,
                            y: moveFrom.y || 0,
                            scale: moveFrom.scale || 0.5
                        }}
                        endPosition={{
                            x: moveTo.x || 3,
                            y: moveTo.y || 0,
                            scale: moveTo.scale || 2
                        }}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}

// Preload GLB models
export function preloadGLB(modelPath: string) {
    useGLTF.preload(modelPath);
}