'use client';

import { useEffect } from 'react';
import { useCircuitStore } from '../store/circuit-store';

export function DemoCircuit() {
  const gates = useCircuitStore(state => state.gates);
  const addGate = useCircuitStore(state => state.addGate);

  useEffect(() => {
    // Only load demo if circuit is empty
    if (gates.length === 0) {
      // Create a simple XOR demo circuit (half adder without carry)
      // This demonstrates the circuit builder capabilities
      
      // Uncomment to load a demo circuit on startup:
      /*
      setTimeout(() => {
        // Add INPUT gates
        addGate('INPUT', [-8, 0, -3]);
        addGate('INPUT', [-8, 0, 3]);
        
        // Add logic gates
        addGate('XOR', [-2, 0, 0]);
        addGate('AND', [-2, 0, 4]);
        
        // Add OUTPUT gates
        addGate('OUTPUT', [5, 0, 0]);
        addGate('OUTPUT', [5, 0, 4]);
      }, 500);
      */
    }
  }, []); // Only run once on mount

  return null;
}
