"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate random nodes in 3D space
function generateNodes(count: number) {
  const nodes: { position: [number, number, number]; velocity: [number, number, number] }[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ],
      velocity: [
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
      ],
    });
  }
  return nodes;
}

// Node component (sphere)
function Node({
  position,
  scale = 0.08,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulse effect
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.02 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial
        color="#a78bfa"
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Connection lines between nearby nodes
function Connections({ nodes }: { nodes: { position: [number, number, number] }[] }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const maxDistance = 3.5;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].position[0] - nodes[j].position[0];
        const dy = nodes[i].position[1] - nodes[j].position[1];
        const dz = nodes[i].position[2] - nodes[j].position[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          positions.push(...nodes[i].position, ...nodes[j].position);
        }
      }
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, maxDistance]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color="#60a5fa"
        transparent
        opacity={0.15}
      />
    </lineSegments>
  );
}

// Animated network scene
function NetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => generateNodes(35), []);

  // Animated node positions
  const animatedNodes = useRef(nodes.map((n) => ({ ...n, currentPos: [...n.position] as [number, number, number] })));

  useFrame(() => {
    if (groupRef.current) {
      // Slow rotation of entire scene
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }

    // Update node positions
    for (const node of animatedNodes.current) {
      node.currentPos[0] += node.velocity[0];
      node.currentPos[1] += node.velocity[1];
      node.currentPos[2] += node.velocity[2];

      // Bounce off boundaries
      if (Math.abs(node.currentPos[0]) > 6) node.velocity[0] *= -1;
      if (Math.abs(node.currentPos[1]) > 4) node.velocity[1] *= -1;
      if (Math.abs(node.currentPos[2]) > 3) node.velocity[2] *= -1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {animatedNodes.current.map((node, i) => (
        <Node key={i} position={node.currentPos} />
      ))}

      {/* Connections */}
      <Connections nodes={animatedNodes.current.map((n) => ({ position: n.currentPos }))} />
    </group>
  );
}

function useScenePaused(wrapRef: React.RefObject<HTMLDivElement | null>) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches || document.hidden) {
        setPaused(true);
        return;
      }
      const el = wrapRef.current;
      if (!el) {
        setPaused(false);
        return;
      }
      const r = el.getBoundingClientRect();
      setPaused(r.bottom <= 0 || r.top >= window.innerHeight);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [wrapRef]);

  return paused;
}

// Main exported component
export default function Network3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const paused = useScenePaused(wrapRef);

  return (
    <div ref={wrapRef} className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        frameloop={paused ? "demand" : "always"}
        gl={{ antialias: true, alpha: true }}
      >
        <NetworkScene />
      </Canvas>
    </div>
  );
}
