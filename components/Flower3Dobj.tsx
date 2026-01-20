"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Model3DProps {
    objPath: string;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    autoRotate?: boolean;
    rotationSpeed?: [number, number, number];
}

// Component untuk render 3D model
function Model3D({
    objPath,
    scale = 1,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = "#ffffff",
    autoRotate = true,
    rotationSpeed = [0.01, 0.01, 0],
}: Model3DProps) {
    const meshRef = useRef<THREE.Group>(null);
    
    // Load OBJ file
    const obj = useLoader(OBJLoader, objPath);

    // Auto rotation animation
    useFrame(() => {
        if (meshRef.current && autoRotate) {
            meshRef.current.rotation.x += rotationSpeed[0];
            meshRef.current.rotation.y += rotationSpeed[1];
            meshRef.current.rotation.z += rotationSpeed[2];
        }
    });

    return (
        <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
            <primitive object={obj}>
                <meshStandardMaterial color={color} />
            </primitive>
        </group>
    );
}

// Loading fallback
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#666" wireframe />
        </mesh>
    );
}

interface Flower3DObjProps {
    objPath: string;
    scale?: number;
    position?: [number, number, number];
    rotation?: [number, number, number];
    color?: string;
    autoRotate?: boolean;
    rotationSpeed?: [number, number, number];
    cameraPosition?: [number, number, number];
    enableControls?: boolean;
    className?: string;
}

export default function Flower3DObj({
    objPath,
    scale = 2,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = "#ff69b4",
    autoRotate = true,
    rotationSpeed = [0.005, 0.01, 0],
    cameraPosition = [0, 0, 5],
    enableControls = false,
    className = "",
}: Flower3DObjProps) {
    return (
        <div className={`${className}`}>
            <Canvas
                camera={{ position: cameraPosition, fov: 50 }}
                style={{ background: "transparent" }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />
                
                {/* 3D Model */}
                <Suspense fallback={<LoadingFallback />}>
                    <Model3D
                        objPath={objPath}
                        scale={scale}
                        position={position}
                        rotation={rotation}
                        color={color}
                        autoRotate={autoRotate}
                        rotationSpeed={rotationSpeed}
                    />
                </Suspense>

                {/* Optional orbit controls */}
                {enableControls && <OrbitControls />}
            </Canvas>
        </div>
    );
}