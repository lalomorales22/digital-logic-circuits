'use client';

import { useCircuitStore } from '../store/circuit-store';
import { Line } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useMemo } from 'react';

export function ConnectionPreview() {
  const connectingFromPin = useCircuitStore(state => state.connectingFromPin);
  const gates = useCircuitStore(state => state.gates);
  const { pointer, camera } = useThree();

  const points = useMemo(() => {
    if (!connectingFromPin) return null;

    // Find the pin position
    let fromPos: Vector3 | null = null;
    
    for (const gate of gates) {
      const outputPin = gate.outputs.find(p => p.id === connectingFromPin);
      if (outputPin) {
        const yOffset = gate.outputs.length > 1 
          ? (outputPin.index - (gate.outputs.length - 1) / 2) * 0.8 
          : 0;
        fromPos = new Vector3(
          gate.position[0] + 1.2,
          gate.position[1] + yOffset,
          gate.position[2]
        );
        break;
      }
    }

    if (!fromPos) return null;

    // Calculate mouse position in 3D space
    const vector = new Vector3(pointer.x, pointer.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.y / dir.y;
    const toPos = camera.position.clone().add(dir.multiplyScalar(distance));

    return [fromPos, toPos];
  }, [connectingFromPin, gates, pointer, camera]);

  if (!points) return null;

  return (
    <Line
      points={points}
      color="#fbbf24"
      lineWidth={2}
      transparent
      opacity={0.6}
      dashed
      dashScale={20}
      dashSize={0.5}
      gapSize={0.5}
    />
  );
}
