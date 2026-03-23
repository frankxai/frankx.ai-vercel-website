'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Environment,
  Float,
  Text3D,
  Center,
  useTexture,
  RoundedBox
} from '@react-three/drei';
import * as THREE from 'three';

// Book Cover Component
function BookCover({ isHovered }: { isHovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const pageRef = useRef<THREE.Mesh>(null);

  // Animate the book
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Rotate toward hover
      const targetRotation = isHovered ? -0.3 : -0.15;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation,
        0.05
      );
    }

    // Animate pages slightly
    if (pageRef.current) {
      pageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }
  });

  // Golden amber gradient colors
  const coverColor = new THREE.Color('#d97706');
  const spineColor = new THREE.Color('#92400e');
  const pageColor = new THREE.Color('#fefce8');
  const goldAccent = new THREE.Color('#fbbf24');

  return (
    <group ref={meshRef} rotation={[0.1, -0.15, 0]}>
      {/* Book Cover - Front */}
      <mesh position={[0, 0, 0.31]} castShadow>
        <boxGeometry args={[2.4, 3.2, 0.08]} />
        <meshStandardMaterial
          color={coverColor}
          roughness={0.3}
          metalness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Book Cover - Gold Border */}
      <mesh position={[0, 0, 0.36]}>
        <boxGeometry args={[2.2, 3.0, 0.01]} />
        <meshStandardMaterial
          color={goldAccent}
          roughness={0.2}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Book Cover - Inner design rectangle */}
      <mesh position={[0, 0.2, 0.37]}>
        <boxGeometry args={[1.8, 2.0, 0.01]} />
        <meshStandardMaterial
          color={coverColor}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Book Cover - Back */}
      <mesh position={[0, 0, -0.31]} castShadow>
        <boxGeometry args={[2.4, 3.2, 0.08]} />
        <meshStandardMaterial
          color={spineColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Book Spine */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.62, 3.2, 0.08]} />
        <meshStandardMaterial
          color={spineColor}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* Spine gold detail lines */}
      {[-1.0, -0.5, 0.5, 1.0].map((y, i) => (
        <mesh key={i} position={[-1.24, y, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.01]} />
          <meshStandardMaterial
            color={goldAccent}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Book Pages */}
      <group ref={pageRef}>
        <mesh position={[0.02, 0, 0]} castShadow>
          <boxGeometry args={[2.3, 3.1, 0.54]} />
          <meshStandardMaterial
            color={pageColor}
            roughness={0.9}
            metalness={0}
          />
        </mesh>

        {/* Page edge lines for texture effect */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[1.17, 0, (i - 5.5) * 0.04]}>
            <boxGeometry args={[0.01, 3.05, 0.02]} />
            <meshStandardMaterial
              color="#f5f5f4"
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* Top page edges (gilded) */}
      <mesh position={[0, 1.58, 0]}>
        <boxGeometry args={[2.35, 0.02, 0.58]} />
        <meshStandardMaterial
          color={goldAccent}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// Floating particles around the book
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#fbbf24"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Ambient glow effect
function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#fbbf24"
        transparent
        opacity={0.05}
      />
    </mesh>
  );
}

// Loading fallback
function BookLoading() {
  return (
    <mesh>
      <boxGeometry args={[2, 3, 0.5]} />
      <meshStandardMaterial color="#d97706" wireframe />
    </mesh>
  );
}

// Scene setup
function Scene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-3, 2, 4]}
        intensity={0.5}
        color="#fbbf24"
      />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#fff7ed" />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Book with float animation */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.3}
      >
        <BookCover isHovered={isHovered} />
      </Float>

      {/* Decorative elements */}
      <Particles />
      <GlowOrb />
    </>
  );
}

// Main export component
export default function Book3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-[400px] sm:h-[500px] lg:h-[600px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<BookLoading />}>
          <Scene isHovered={isHovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
