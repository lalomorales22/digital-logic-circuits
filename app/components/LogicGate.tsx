'use client';

import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { Text, RoundedBox, Cone, Cylinder, Torus, Octahedron, Box, Sphere } from '@react-three/drei';
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

// 3D Shape Component for each gate type
function GateShape({ type, color, emissive, emissiveIntensity, opacity }: any) {
  const materialProps = {
    color,
    emissive,
    emissiveIntensity,
    metalness: 0.6,
    roughness: 0.3,
    opacity,
    transparent: true,
  };

  switch (type) {
    case 'INPUT':
      return (
        <Cylinder args={[0.8, 0.8, 1.2, 6]}>
          <meshStandardMaterial {...materialProps} />
        </Cylinder>
      );
    case 'OUTPUT':
      return (
        <Cone args={[0.9, 1.5, 6]}>
          <meshStandardMaterial {...materialProps} />
        </Cone>
      );
    case 'AND':
      return (
        <Box args={[1.8, 1.2, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial {...materialProps} />
        </Box>
      );
    case 'OR':
      return (
        <Sphere args={[0.8, 32, 32]} scale={[1.2, 1, 0.7]}>
          <meshStandardMaterial {...materialProps} />
        </Sphere>
      );
    case 'NOT':
      return (
        <group>
          <Cone args={[0.7, 1.3, 4]} rotation={[0, Math.PI / 4, 0]}>
            <meshStandardMaterial {...materialProps} />
          </Cone>
        </group>
      );
    case 'NAND':
      return (
        <Octahedron args={[0.9]}>
          <meshStandardMaterial {...materialProps} />
        </Octahedron>
      );
    case 'NOR':
      return (
        <group>
          <Torus args={[0.7, 0.3, 16, 32]}>
            <meshStandardMaterial {...materialProps} />
          </Torus>
          <Sphere args={[0.4]} position={[0, 0, 0]}>
            <meshStandardMaterial {...materialProps} />
          </Sphere>
        </group>
      );
    case 'XOR':
      return (
        <group>
          <Box args={[1.5, 0.3, 0.6]} position={[0, 0.4, 0]} rotation={[0, 0, Math.PI / 8]}>
            <meshStandardMaterial {...materialProps} />
          </Box>
          <Box args={[1.5, 0.3, 0.6]} position={[0, -0.4, 0]} rotation={[0, 0, -Math.PI / 8]}>
            <meshStandardMaterial {...materialProps} />
          </Box>
          <Sphere args={[0.35]} position={[0, 0, 0]}>
            <meshStandardMaterial {...materialProps} />
          </Sphere>
        </group>
      );
    case 'XNOR':
      return (
        <group>
          <Cylinder args={[0.6, 0.9, 1.3, 8]}>
            <meshStandardMaterial {...materialProps} />
          </Cylinder>
        </group>
      );
    default:
      return (
        <Box args={[1.5, 1.2, 0.8]}>
          <meshStandardMaterial {...materialProps} />
        </Box>
      );
  }
}

export function LogicGate({ gate }: LogicGateProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  
  const moveGate = useCircuitStore(state => state.moveGate);
  const selectGate = useCircuitStore(state => state.selectGate);
  const resizeGate = useCircuitStore(state => state.resizeGate);
  const selectedGateId = useCircuitStore(state => state.selectedGateId);
  const startConnection = useCircuitStore(state => state.startConnection);
  const completeConnection = useCircuitStore(state => state.completeConnection);
  const connectingFromPin = useCircuitStore(state => state.connectingFromPin);
  const toggleInput = useCircuitStore(state => state.toggleInput);
  
  const isSelected = selectedGateId === gate.id;
  const baseColor = GATE_COLORS[gate.type] || '#6b7280';
  const outputSignal = gate.outputs[0]?.signal || false;
  const gateScale = gate.scale || 1;

  // Debug logging
  console.log(`Gate ${gate.type} (${gate.id}):`, {
    inputCount: gate.inputs.length,
    outputCount: gate.outputs.length,
    inputs: gate.inputs,
    outputs: gate.outputs
  });

  // Pulse animation for active gates
  useFrame((state) => {
    if (groupRef.current && outputSignal) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.9;
      const scaleFactor = 1 + pulse * 0.05;
      groupRef.current.scale.setScalar(gateScale * scaleFactor);
    } else if (groupRef.current) {
      groupRef.current.scale.setScalar(gateScale);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    
    // Check if clicking on resize handle
    if ((e as any).object?.userData?.isResizeHandle) {
      setIsResizing(true);
      return;
    }
    
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

  const handleWheel = (e: ThreeEvent<WheelEvent>) => {
    if (isSelected && e.shiftKey) {
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.max(0.5, Math.min(3, gateScale + delta));
      resizeGate(gate.id, newScale);
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
    <group position={gate.position} ref={groupRef}>
      {/* Main Gate Body with unique 3D shape */}
      <group
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onWheel={handleWheel}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <GateShape
          type={gate.type}
          color={baseColor}
          emissive={outputSignal ? baseColor : '#000000'}
          emissiveIntensity={outputSignal ? 0.7 : 0}
          opacity={isDragging ? 0.7 : hovered || isSelected ? 1 : 0.9}
        />
        
        {/* Add point light when gate is active */}
        {outputSignal && (
          <pointLight
            position={[0, 0, 0]}
            intensity={0.8}
            distance={4}
            color={baseColor}
          />
        )}
      </group>

      {/* Gate Label */}
      <Text
        position={[0, 0, 1]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {gate.type}
      </Text>

      {/* Scale indicator when selected */}
      {isSelected && (
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.25}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
        >
          {`Scale: ${gateScale.toFixed(1)}x (Shift+Scroll)`}
        </Text>
      )}

      {/* Input Pins */}
      {gate.inputs.map((pin, idx) => {
        console.log(`Pin ${idx}, pin.index=${pin.index}, gate.inputs.length=${gate.inputs.length}`);
        
        const yOffset = gate.inputs.length > 1 
          ? (pin.index - (gate.inputs.length - 1) / 2) * 1.5  // Use pin.index instead of idx!
          : 0;
        
        console.log(`Rendering input pin ${idx} (pin.index=${pin.index}) for ${gate.type} at yOffset: ${yOffset}`);
        
        return (
          <group key={pin.id} position={[-1.8 * gateScale, yOffset * gateScale, 0]}>
            <mesh
              onClick={(e) => handlePinClick(e, pin.id, 'input')}
            >
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial
                color={pin.signal ? '#22c55e' : '#ff0000'}
                emissive={pin.signal ? '#22c55e' : '#ff0000'}
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Glow ring for active pins */}
            {pin.signal && (
              <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[0.27, 0.33, 32]} />
                <meshBasicMaterial color="#22c55e" transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Output Pins */}
      {gate.outputs.map((pin, idx) => {
        const yOffset = gate.outputs.length > 1 
          ? (pin.index - (gate.outputs.length - 1) / 2) * 1.5  // Use pin.index instead of idx!
          : 0;
        
        return (
          <group key={pin.id} position={[1.8 * gateScale, yOffset * gateScale, 0]}>
            <mesh
              onClick={(e) => handlePinClick(e, pin.id, 'output')}
            >
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial
                color={pin.signal ? '#22c55e' : '#64748b'}
                emissive={pin.signal ? '#22c55e' : '#000000'}
                emissiveIntensity={pin.signal ? 0.8 : 0}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Glow ring for active pins */}
            {pin.signal && (
              <mesh rotation={[0, 0, 0]}>
                <ringGeometry args={[0.27, 0.33, 32]} />
                <meshBasicMaterial color="#22c55e" transparent opacity={0.6} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Selection Ring */}
      {isSelected && !isDragging && (
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5 * gateScale, 1.7 * gateScale, 64]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.7} />
        </mesh>
      )}

      {/* Drag Mode Ring */}
      {isDragging && (
        <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5 * gateScale, 1.8 * gateScale, 64]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  );
}
