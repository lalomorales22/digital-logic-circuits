'use client';

import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import { Gate } from '../store/circuit-store';
import { useCircuitStore } from '../store/circuit-store';

interface LogicGateProps {
  gate: Gate;
}

const GATE_COLORS: Record<string, string> = {
  INPUT: '#10b981',
  OUTPUT: '#f59e0b',
  AND: '#3b82f6',
  OR: '#8b5cf6',
  NOT: '#ef4444',
  NAND: '#06b6d4',
  NOR: '#ec4899',
  XOR: '#14b8a6',
  XNOR: '#f97316',
};

export function LogicGate({ gate }: LogicGateProps) {
  const meshRef = useRef<Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const moveGate = useCircuitStore(state => state.moveGate);
  const selectGate = useCircuitStore(state => state.selectGate);
  const selectedGateId = useCircuitStore(state => state.selectedGateId);
  const startConnection = useCircuitStore(state => state.startConnection);
  const completeConnection = useCircuitStore(state => state.completeConnection);
  const connectingFromPin = useCircuitStore(state => state.connectingFromPin);
  const toggleInput = useCircuitStore(state => state.toggleInput);
  
  const isSelected = selectedGateId === gate.id;
  const baseColor = GATE_COLORS[gate.type] || '#6b7280';
  const outputSignal = gate.outputs[0]?.signal || false;

  // Pulse animation for active gates
  useFrame((state) => {
    if (meshRef.current && outputSignal) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.9;
      meshRef.current.scale.setScalar(1 + pulse * 0.05);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    
    // If already selected, start dragging mode
    if (isSelected && !isDragging) {
      setIsDragging(true);
    } else if (isDragging) {
      // Click again to drop
      setIsDragging(false);
    } else {
      // First click - select the gate
      selectGate(gate.id);
    }
  };

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (isDragging) {
      e.stopPropagation();
      // Get the intersection point with the ground plane (y=0)
      const point = e.point;
      moveGate(gate.id, [
        Math.round(point.x * 2) / 2, // Snap to 0.5 grid
        0,
        Math.round(point.z * 2) / 2
      ]);
    }
  };

  const handlePinClick = (e: ThreeEvent<MouseEvent>, pinId: string, pinType: 'input' | 'output') => {
    e.stopPropagation();
    
    if (pinType === 'output' && !connectingFromPin) {
      startConnection(pinId);
    } else if (pinType === 'input' && connectingFromPin) {
      completeConnection(pinId);
    } else if (pinType === 'output' && gate.type === 'INPUT') {
      toggleInput(gate.id);
    }
  };

  return (
    <group position={gate.position}>
      {/* Main Gate Body */}
      <RoundedBox
        ref={meshRef}
        args={[2, 1.5, 0.5]}
        radius={0.1}
        smoothness={4}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={baseColor}
          emissive={outputSignal ? baseColor : '#000000'}
          emissiveIntensity={outputSignal ? 0.5 : 0}
          metalness={0.3}
          roughness={0.4}
          opacity={isDragging ? 0.7 : hovered || isSelected ? 1 : 0.9}
          transparent
        />
      </RoundedBox>

      {/* Gate Label */}
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {gate.type}
      </Text>

      {/* Input Pins */}
      {gate.inputs.map((pin, idx) => {
        const yOffset = gate.inputs.length > 1 
          ? (idx - (gate.inputs.length - 1) / 2) * 0.8 
          : 0;
        
        return (
          <group key={pin.id} position={[-1.2, yOffset, 0]}>
            <mesh
              onClick={(e) => handlePinClick(e, pin.id, 'input')}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={pin.signal ? '#22c55e' : '#4b5563'}
                emissive={pin.signal ? '#22c55e' : '#000000'}
                emissiveIntensity={pin.signal ? 0.6 : 0}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Output Pins */}
      {gate.outputs.map((pin, idx) => {
        const yOffset = gate.outputs.length > 1 
          ? (idx - (gate.outputs.length - 1) / 2) * 0.8 
          : 0;
        
        return (
          <group key={pin.id} position={[1.2, yOffset, 0]}>
            <mesh
              onClick={(e) => handlePinClick(e, pin.id, 'output')}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={pin.signal ? '#22c55e' : '#4b5563'}
                emissive={pin.signal ? '#22c55e' : '#000000'}
                emissiveIntensity={pin.signal ? 0.6 : 0}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Selection Ring */}
      {isSelected && !isDragging && (
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Drag Mode Ring */}
      {isDragging && (
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.5, 32]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}
