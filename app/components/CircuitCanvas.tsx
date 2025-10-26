'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { LogicGate } from './LogicGate';
import { Wire } from './Wire';
import { ConnectionPreview } from './ConnectionPreview';
import { useCircuitStore } from '../store/circuit-store';
import { useEffect } from 'react';

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
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 10, 0]} intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />

        {/* Grid */}
        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#27272a"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#3f3f46"
          fadeDistance={50}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid
          rotation={[0, 0, 0]}
        />

        {/* Invisible ground plane for raycasting */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} visible={false}>
          <planeGeometry args={[100, 100]} />
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

        {/* Controls - Top-down view only */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={false}
          minZoom={10}
          maxZoom={80}
          minPolarAngle={0}
          maxPolarAngle={0}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
