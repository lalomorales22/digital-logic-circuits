import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type GateType = 'INPUT' | 'OUTPUT' | 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

export interface Pin {
  id: string;
  gateId: string;
  type: 'input' | 'output';
  index: number;
  signal: boolean;
}

export interface Gate {
  id: string;
  type: GateType;
  position: [number, number, number];
  inputs: Pin[];
  outputs: Pin[];
  scale?: number;
  label?: string;
}

export interface Wire {
  id: string;
  fromPin: string;
  toPin: string;
  signal: boolean;
}

interface CircuitStore {
  gates: Gate[];
  wires: Wire[];
  selectedGateId: string | null;
  connectingFromPin: string | null;
  isSimulating: boolean;
  
  // Actions
  addGate: (type: GateType, position: [number, number, number]) => void;
  removeGate: (id: string) => void;
  moveGate: (id: string, position: [number, number, number]) => void;
  resizeGate: (id: string, scale: number) => void;
  selectGate: (id: string | null) => void;
  
  startConnection: (pinId: string) => void;
  completeConnection: (pinId: string) => void;
  cancelConnection: () => void;
  removeWire: (id: string) => void;
  
  toggleInput: (gateId: string) => void;
  runSimulation: () => void;
  clearCircuit: () => void;
}

const createGate = (type: GateType, position: [number, number, number]): Gate => {
  const id = uuidv4();
  
  // Define input and output counts for each gate type explicitly
  let inputCount: number;
  let outputCount: number;
  
  switch (type) {
    case 'INPUT':
      inputCount = 0;  // INPUT gates have no inputs (they are signal sources)
      outputCount = 1; // INPUT gates have 1 output
      break;
    case 'OUTPUT':
      inputCount = 1;  // OUTPUT gates have 1 input (they display the signal)
      outputCount = 0; // OUTPUT gates have no outputs
      break;
    case 'NOT':
      inputCount = 1;  // NOT gates have 1 input
      outputCount = 1; // NOT gates have 1 output
      break;
    case 'AND':
    case 'OR':
    case 'NAND':
    case 'NOR':
    case 'XOR':
    case 'XNOR':
      inputCount = 2;  // All other logic gates have 2 inputs
      outputCount = 1; // All other logic gates have 1 output
      break;
    default:
      inputCount = 2;
      outputCount = 1;
  }
  
  const inputs: Pin[] = Array.from({ length: inputCount }, (_, i) => ({
    id: uuidv4(),
    gateId: id,
    type: 'input' as const,
    index: i,
    signal: false,
  }));
  
  const outputs: Pin[] = Array.from({ length: outputCount }, (_, i) => ({
    id: uuidv4(),
    gateId: id,
    type: 'output' as const,
    index: i,
    signal: false,
  }));
  
  return { id, type, position, inputs, outputs, scale: 1 };
};

const evaluateGate = (gate: Gate): boolean => {
  const inputSignals = gate.inputs.map(pin => pin.signal);
  
  switch (gate.type) {
    case 'INPUT':
      return gate.outputs[0]?.signal || false;
    case 'OUTPUT':
      return gate.inputs[0]?.signal || false;
    case 'AND':
      return inputSignals.every(s => s);
    case 'OR':
      return inputSignals.some(s => s);
    case 'NOT':
      return !inputSignals[0];
    case 'NAND':
      return !inputSignals.every(s => s);
    case 'NOR':
      return !inputSignals.some(s => s);
    case 'XOR':
      return inputSignals.filter(s => s).length === 1;
    case 'XNOR':
      return inputSignals.filter(s => s).length !== 1;
    default:
      return false;
  }
};

export const useCircuitStore = create<CircuitStore>((set, get) => ({
  gates: [],
  wires: [],
  selectedGateId: null,
  connectingFromPin: null,
  isSimulating: false,
  
  addGate: (type, position) => {
    const gate = createGate(type, position);
    console.log('Created gate:', type, 'with inputs:', gate.inputs.length, 'outputs:', gate.outputs.length);
    console.log('Gate details:', gate);
    set(state => ({ gates: [...state.gates, gate] }));
  },
  
  removeGate: (id) => {
    set(state => ({
      gates: state.gates.filter(g => g.id !== id),
      wires: state.wires.filter(w => {
        const fromGate = state.gates.find(g => g.outputs.some(p => p.id === w.fromPin));
        const toGate = state.gates.find(g => g.inputs.some(p => p.id === w.toPin));
        return fromGate?.id !== id && toGate?.id !== id;
      }),
      selectedGateId: state.selectedGateId === id ? null : state.selectedGateId,
    }));
  },
  
  moveGate: (id, position) => {
    set(state => ({
      gates: state.gates.map(g => g.id === id ? { ...g, position } : g),
    }));
  },
  
  resizeGate: (id, scale) => {
    set(state => ({
      gates: state.gates.map(g => g.id === id ? { ...g, scale } : g),
    }));
  },
  
  selectGate: (id) => {
    set({ selectedGateId: id });
  },
  
  startConnection: (pinId) => {
    set({ connectingFromPin: pinId });
  },
  
  completeConnection: (toPinId) => {
    const { connectingFromPin, gates, wires } = get();
    if (!connectingFromPin) return;
    
    // Find the pins
    let fromPin: Pin | undefined;
    let toPin: Pin | undefined;
    
    for (const gate of gates) {
      if (!fromPin) fromPin = gate.outputs.find(p => p.id === connectingFromPin);
      if (!toPin) toPin = gate.inputs.find(p => p.id === toPinId);
    }
    
    if (!fromPin || !toPin || fromPin.type !== 'output' || toPin.type !== 'input') {
      set({ connectingFromPin: null });
      return;
    }
    
    // Check if connection already exists
    const exists = wires.some(w => w.toPin === toPinId);
    if (exists) {
      set({ connectingFromPin: null });
      return;
    }
    
    const wire: Wire = {
      id: uuidv4(),
      fromPin: connectingFromPin,
      toPin: toPinId,
      signal: false,
    };
    
    set(state => ({
      wires: [...state.wires, wire],
      connectingFromPin: null,
    }));
  },
  
  cancelConnection: () => {
    set({ connectingFromPin: null });
  },
  
  removeWire: (id) => {
    set(state => ({
      wires: state.wires.filter(w => w.id !== id),
    }));
  },
  
  toggleInput: (gateId) => {
    set(state => ({
      gates: state.gates.map(g => {
        if (g.id === gateId && g.type === 'INPUT') {
          const newSignal = !g.outputs[0].signal;
          return {
            ...g,
            outputs: g.outputs.map(p => ({ ...p, signal: newSignal })),
          };
        }
        return g;
      }),
    }));
  },
  
  runSimulation: () => {
    set({ isSimulating: true });
    
    const { gates, wires } = get();
    const gateMap = new Map(gates.map(g => [g.id, { ...g }]));
    
    // Reset all non-input gates
    gateMap.forEach(gate => {
      if (gate.type !== 'INPUT') {
        gate.inputs.forEach(pin => pin.signal = false);
        gate.outputs.forEach(pin => pin.signal = false);
      }
    });
    
    // Propagate signals using BFS
    const queue: string[] = gates.filter(g => g.type === 'INPUT').map(g => g.id);
    const visited = new Set<string>();
    
    while (queue.length > 0) {
      const gateId = queue.shift()!;
      if (visited.has(gateId)) continue;
      visited.add(gateId);
      
      const gate = gateMap.get(gateId);
      if (!gate) continue;
      
      // Evaluate gate
      const outputSignal = evaluateGate(gate);
      gate.outputs.forEach(pin => pin.signal = outputSignal);
      
      // Propagate to connected gates
      gate.outputs.forEach(outputPin => {
        const connectedWires = wires.filter(w => w.fromPin === outputPin.id);
        
        connectedWires.forEach(wire => {
          // Update wire signal
          wire.signal = outputSignal;
          
          // Find connected input pin
          for (const nextGate of gateMap.values()) {
            const inputPin = nextGate.inputs.find(p => p.id === wire.toPin);
            if (inputPin) {
              inputPin.signal = outputSignal;
              queue.push(nextGate.id);
            }
          }
        });
      });
    }
    
    // Update state
    set({
      gates: Array.from(gateMap.values()),
      wires: wires.map(w => {
        const fromGate = Array.from(gateMap.values()).find(g => 
          g.outputs.some(p => p.id === w.fromPin)
        );
        const outputPin = fromGate?.outputs.find(p => p.id === w.fromPin);
        return { ...w, signal: outputPin?.signal || false };
      }),
      isSimulating: false,
    });
  },
  
  clearCircuit: () => {
    set({
      gates: [],
      wires: [],
      selectedGateId: null,
      connectingFromPin: null,
    });
  },
}));
