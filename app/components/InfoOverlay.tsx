'use client';

import { useCircuitStore } from '../store/circuit-store';

export function InfoOverlay() {
  const connectingFromPin = useCircuitStore(state => state.connectingFromPin);
  const selectedGateId = useCircuitStore(state => state.selectedGateId);
  const gates = useCircuitStore(state => state.gates);

  const selectedGate = gates.find(g => g.id === selectedGateId);

  return (
    <div 
      className="fixed top-4 left-1/2 -translate-x-1/2 pointer-events-none z-50"
      style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 50
      }}
    >
      {connectingFromPin && (
        <div 
          className="bg-amber-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-amber-300 animate-pulse"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            border: '2px solid #fcd34d',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          <p 
            className="text-white font-semibold text-sm"
            style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}
          >
            🔌 Creating Connection - Click an input pin or press ESC to cancel
          </p>
        </div>
      )}

      {selectedGate && !connectingFromPin && (
        <div 
          className="bg-zinc-800/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-zinc-600"
          style={{
            backgroundColor: 'rgba(39, 39, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            border: '1px solid #52525b'
          }}
        >
          <p 
            className="text-white font-semibold text-sm"
            style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}
          >
            ✓ {selectedGate.type} selected - Click to move, click again to drop, or press DELETE
          </p>
        </div>
      )}

      {!selectedGate && !connectingFromPin && gates.length === 0 && (
        <div 
          className="bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-blue-300"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.9)',
            backdropFilter: 'blur(8px)',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            border: '2px solid #93c5fd'
          }}
        >
          <p 
            className="text-white font-semibold text-sm"
            style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}
          >
            👋 Welcome! Click a gate in the sidebar to start building
          </p>
        </div>
      )}
    </div>
  );
}
