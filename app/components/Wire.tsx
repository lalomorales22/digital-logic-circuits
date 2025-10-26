'use client';

import { useRef, useMemo } from 'react';
import { Line } from '@react-three/drei';
import { Wire as WireType } from '../store/circuit-store';
import { useCircuitStore } from '../store/circuit-store';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface WireProps {
  wire: WireType;
}

export function Wire({ wire }: WireProps) {
  const gates = useCircuitStore(state => state.gates);
  const lineRef = useRef<any>(null);
  
  // Find the positions of the pins
  const { fromPos, toPos } = useMemo(() => {
    let fromPos: Vector3 | null = null;
    let toPos: Vector3 | null = null;
    
    for (const gate of gates) {
      const outputPin = gate.outputs.find(p => p.id === wire.fromPin);
      if (outputPin) {
        const yOffset = gate.outputs.length > 1 
          ? (outputPin.index - (gate.outputs.length - 1) / 2) * 0.8 
          : 0;
        fromPos = new Vector3(
          gate.position[0] + 1.2,
          gate.position[1] + yOffset,
          gate.position[2]
        );
      }
      
      const inputPin = gate.inputs.find(p => p.id === wire.toPin);
      if (inputPin) {
        const yOffset = gate.inputs.length > 1 
          ? (inputPin.index - (gate.inputs.length - 1) / 2) * 0.8 
          : 0;
        toPos = new Vector3(
          gate.position[0] - 1.2,
          gate.position[1] + yOffset,
          gate.position[2]
        );
      }
    }
    
    return { fromPos, toPos };
  }, [gates, wire]);

  // Create curved path
  const points = useMemo(() => {
    if (!fromPos || !toPos) return [];
    
    const distance = fromPos.distanceTo(toPos);
    const midPoint = new Vector3().lerpVectors(fromPos, toPos, 0.5);
    const controlHeight = Math.min(distance * 0.3, 2);
    
    // Create bezier curve
    const curve: Vector3[] = [];
    const segments = 20;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const t2 = t * t;
      const t3 = t2 * t;
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      
      const x = mt3 * fromPos.x + 3 * mt2 * t * (fromPos.x + (toPos.x - fromPos.x) * 0.3) +
                3 * mt * t2 * (toPos.x - (toPos.x - fromPos.x) * 0.3) + t3 * toPos.x;
      const y = mt3 * fromPos.y + 3 * mt2 * t * (fromPos.y + controlHeight) +
                3 * mt * t2 * (toPos.y + controlHeight) + t3 * toPos.y;
      const z = mt3 * fromPos.z + 3 * mt2 * t * fromPos.z +
                3 * mt * t2 * toPos.z + t3 * toPos.z;
      
      curve.push(new Vector3(x, y, z));
    }
    
    return curve;
  }, [fromPos, toPos]);

  // Animate signal flow
  useFrame((state) => {
    if (lineRef.current && wire.signal) {
      const material = lineRef.current.material;
      if (material) {
        material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 4) * 0.4;
      }
    }
  });

  if (!fromPos || !toPos || points.length === 0) return null;

  return (
    <Line
      ref={lineRef}
      points={points}
      color={wire.signal ? '#22c55e' : '#4b5563'}
      lineWidth={wire.signal ? 3 : 2}
      transparent
      opacity={wire.signal ? 1 : 0.5}
    />
  );
}
