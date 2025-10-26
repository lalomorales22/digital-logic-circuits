'use client';

import { useEffect } from 'react';
import { useCircuitStore } from '../store/circuit-store';

export function KeyboardShortcuts() {
  const selectedGateId = useCircuitStore(state => state.selectedGateId);
  const removeGate = useCircuitStore(state => state.removeGate);
  const runSimulation = useCircuitStore(state => state.runSimulation);
  const clearCircuit = useCircuitStore(state => state.clearCircuit);
  const selectGate = useCircuitStore(state => state.selectGate);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete/Backspace - delete selected gate
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedGateId) {
        e.preventDefault();
        removeGate(selectedGateId);
      }

      // Escape - deselect
      if (e.key === 'Escape') {
        selectGate(null);
      }

      // Space - run simulation
      if (e.key === ' ' && !e.repeat) {
        e.preventDefault();
        runSimulation();
      }

      // Ctrl/Cmd + K - clear circuit
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (confirm('Clear entire circuit?')) {
          clearCircuit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGateId, removeGate, runSimulation, clearCircuit, selectGate]);

  return null;
}
