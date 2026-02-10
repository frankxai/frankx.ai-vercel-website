'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Seeded random for deterministic particles
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Floating particles around the book
function Particles({ count = 50 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create particle positions once with stable seeded values
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        position: [
          (seededRandom(i * 3) - 0.5) * 8,
          (seededRandom(i * 3 + 1) - 0.5) * 6,
          (seededRandom(i * 3 + 2) - 0.5) * 4,
        ],
        speed: seededRandom(i * 7) * 0.5 + 0.2,
        offset: seededRandom(i * 11) * Math.PI * 2,
      })),
    [count]
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      const t = clock.elapsedTime * particle.speed + particle.offset;
      dummy.position.set(
        particle.position[0] + Math.sin(t) * 0.3,
        particle.position[1] + Math.cos(t * 0.8) * 0.4,
        particle.position[2] + Math.sin(t * 0.6) * 0.2
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 2) * 0.01);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// The 3D Book model
function Book() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    // Gentle rotation based on mouse position
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.3 + Math.sin(clock.elapsedTime * 0.5) * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.1,
      0.05
    );
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef}>
        {/* Book cover - front */}
        <mesh position={[0, 0, 0.15]}>
          <boxGeometry args={[2.4, 3.2, 0.08]} />
          <meshStandardMaterial
            color="#b45309"
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>

        {/* Book cover - back */}
        <mesh position={[0, 0, -0.15]}>
          <boxGeometry args={[2.4, 3.2, 0.08]} />
          <meshStandardMaterial
            color="#92400e"
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>

        {/* Book spine */}
        <mesh position={[-1.2, 0, 0]}>
          <boxGeometry args={[0.08, 3.2, 0.3]} />
          <meshStandardMaterial
            color="#78350f"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Pages - gilded edges */}
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[2.2, 3.0, 0.22]} />
          <meshStandardMaterial
            color="#fef3c7"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Gold page edges */}
        <mesh position={[1.13, 0, 0]}>
          <boxGeometry args={[0.04, 3.0, 0.22]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Title emboss - decorative element */}
        <mesh position={[0, 0.5, 0.2]}>
          <boxGeometry args={[1.8, 0.08, 0.01]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.5, 0.2]}>
          <boxGeometry args={[1.8, 0.08, 0.01]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Center emblem */}
        <mesh position={[0, 0, 0.21]}>
          <ringGeometry args={[0.3, 0.4, 32]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.2}
            metalness={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Glowing orb behind the book
function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime) * 0.1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <sphereGeometry args={[2, 32, 32]} />
      <MeshDistortMaterial
        color="#fbbf24"
        transparent
        opacity={0.15}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

// Loading fallback
function BookFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-44 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg shadow-2xl animate-pulse" />
    </div>
  );
}

// Main Book3D component
export default function Book3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Suspense fallback={<BookFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Ambient lighting */}
          <ambientLight intensity={0.4} />

          {/* Key light - warm */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            color="#fef3c7"
          />

          {/* Fill light - cool */}
          <directionalLight
            position={[-5, 3, 2]}
            intensity={0.5}
            color="#e0e7ff"
          />

          {/* Rim light */}
          <pointLight
            position={[0, -3, 3]}
            intensity={0.5}
            color="#fbbf24"
          />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Scene elements */}
          <GlowOrb />
          <Book />
          <Particles count={40} />
        </Canvas>
      </Suspense>
    </div>
  );
}
