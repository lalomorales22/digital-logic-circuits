'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { LogicGate } from './LogicGate';
import { Wire } from './Wire';
import { ConnectionPreview } from './ConnectionPreview';
import { useCircuitStore } from '../store/circuit-store';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Dot Grid Component
function DotGrid({ size = 50, spacing = 0.5, dotSize = 0.05 }) {
  const points = useMemo(() => {
    const positions: number[] = [];
    const halfSize = size / 2;
    
    for (let x = -halfSize; x <= halfSize; x += spacing) {
      for (let z = -halfSize; z <= halfSize; z += spacing) {
        positions.push(x, 0, z);
      }
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    
    return geometry;
  }, [size, spacing]);

  return (
    <points geometry={points}>
      <pointsMaterial
        size={dotSize}
        color="#52525b"
        sizeAttenuation={true}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export function CircuitCanvas() {
  const gates = useCircuitStore(state => state.gates);
  const wires = useCircuitStore(state => state.wires);
  const cancelConnection = useCircuitStore(state => state.cancelConnection);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelConnection();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [cancelConnection]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ 
          position: [0, 20, 0],
          fov: 50,
          up: [0, 1, 0],
          rotation: [-Math.PI / 2, 0, 0]
        }}
        className="bg-zinc-950"
        orthographic
        camera-zoom={30}
      >
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[0, 10, 0]} intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#a855f7" />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />

        {/* Dot Grid */}
        <DotGrid size={100} spacing={0.5} dotSize={0.08} />
        
        {/* Larger dots at major grid intersections */}
        <DotGrid size={100} spacing={5} dotSize={0.15} />

        {/* Invisible ground plane for raycasting */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} visible={false}>
          <planeGeometry args={[200, 200]} />
          <meshBasicMaterial />
        </mesh>

        {/* Gates */}
        {gates.map(gate => (
          <LogicGate key={gate.id} gate={gate} />
        ))}

        {/* Wires */}
        {wires.map(wire => (
          <Wire key={wire.id} wire={wire} />
        ))}

        {/* Connection Preview */}
        <ConnectionPreview />

        {/* Controls - Enhanced for free movement */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={false}
          minZoom={5}
          maxZoom={100}
          minPolarAngle={0}
          maxPolarAngle={0}
          target={[0, 0, 0]}
          panSpeed={1}
          zoomSpeed={1.2}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
    </div>
  );
}
