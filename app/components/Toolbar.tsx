'use client';

import { useCircuitStore, GateType } from '../store/circuit-store';

const LOGIC_GATES: { type: GateType; label: string; color: string; description: string }[] = [
  { type: 'INPUT', label: 'INPUT', color: 'bg-emerald-600', description: 'Input signal source' },
  { type: 'OUTPUT', label: 'OUTPUT', color: 'bg-amber-600', description: 'Output display' },
  { type: 'AND', label: 'AND', color: 'bg-blue-600', description: 'Both inputs must be high' },
  { type: 'OR', label: 'OR', color: 'bg-violet-600', description: 'At least one input high' },
  { type: 'NOT', label: 'NOT', color: 'bg-red-600', description: 'Inverts the input' },
  { type: 'NAND', label: 'NAND', color: 'bg-cyan-600', description: 'NOT AND gate' },
  { type: 'NOR', label: 'NOR', color: 'bg-pink-600', description: 'NOT OR gate' },
  { type: 'XOR', label: 'XOR', color: 'bg-teal-600', description: 'Exactly one input high' },
  { type: 'XNOR', label: 'XNOR', color: 'bg-orange-600', description: 'NOT XOR gate' },
];

export function Toolbar() {
  const addGate = useCircuitStore(state => state.addGate);
  const runSimulation = useCircuitStore(state => state.runSimulation);
  const clearCircuit = useCircuitStore(state => state.clearCircuit);
  const gates = useCircuitStore(state => state.gates);
  const wires = useCircuitStore(state => state.wires);

  const handleAddGate = (type: GateType) => {
    // Add gate at a random position near the center
    const x = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    addGate(type, [x, 0, z]);
  };

  return (
    <div 
      className="fixed left-0 top-0 w-80 h-full bg-zinc-900 border-r border-zinc-800 overflow-y-auto"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '320px',
        height: '100vh',
        backgroundColor: '#18181b',
        borderRight: '1px solid #27272a',
        overflowY: 'auto',
        zIndex: 100
      }}
    >
      <div className="p-4 space-y-6" style={{ padding: '1rem' }}>
        <div>
          <h1 
            className="text-2xl font-bold text-white mb-2"
            style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}
          >
            Logic Circuit
          </h1>
          <p 
            className="text-sm text-zinc-400"
            style={{ fontSize: '0.875rem', color: '#a1a1aa' }}
          >
            3D Designer
          </p>
        </div>

        <div 
          className="bg-zinc-800 rounded-lg p-3 text-xs space-y-1"
          style={{ 
            backgroundColor: '#27272a', 
            borderRadius: '0.5rem', 
            padding: '0.75rem',
            fontSize: '0.75rem',
            marginTop: '1.5rem'
          }}
        >
          <div className="flex justify-between text-zinc-400" style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa' }}>
            <span>Gates:</span>
            <span className="text-white font-mono" style={{ color: 'white', fontFamily: 'monospace' }}>{gates.length}</span>
          </div>
          <div className="flex justify-between text-zinc-400" style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa', marginTop: '0.25rem' }}>
            <span>Connections:</span>
            <span className="text-white font-mono" style={{ color: 'white', fontFamily: 'monospace' }}>{wires.length}</span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h2 
            className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider"
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#a1a1aa', 
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Logic Gates
          </h2>
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {LOGIC_GATES.map(gate => (
              <button
                key={gate.type}
                onClick={() => handleAddGate(gate.type)}
                className={`w-full px-4 py-3 text-left text-white ${gate.color} hover:brightness-110 rounded-lg transition-all transform hover:scale-105 shadow-lg group`}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  color: 'white',
                  backgroundColor: gate.color.includes('emerald') ? '#059669' :
                                   gate.color.includes('amber') ? '#d97706' :
                                   gate.color.includes('blue') ? '#2563eb' :
                                   gate.color.includes('violet') ? '#7c3aed' :
                                   gate.color.includes('red') ? '#dc2626' :
                                   gate.color.includes('cyan') ? '#0891b2' :
                                   gate.color.includes('pink') ? '#db2777' :
                                   gate.color.includes('teal') ? '#0d9488' :
                                   gate.color.includes('orange') ? '#ea580c' : '#4b5563',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              >
                <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="font-semibold" style={{ fontWeight: '600' }}>{gate.label}</span>
                  <span className="text-xs opacity-75 group-hover:opacity-100" style={{ fontSize: '0.75rem', opacity: 0.75 }}>+</span>
                </div>
                <div className="text-xs opacity-75 mt-1" style={{ fontSize: '0.75rem', opacity: 0.75, marginTop: '0.25rem' }}>{gate.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <h2 
            className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider"
            style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#a1a1aa', 
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Actions
          </h2>
          <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={runSimulation}
              className="w-full px-4 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                color: 'white',
                backgroundColor: '#16a34a',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              ▶ Run Simulation
            </button>
            <button
              onClick={clearCircuit}
              className="w-full px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                color: 'white',
                backgroundColor: '#dc2626',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            >
              🗑 Clear Circuit
            </button>
          </div>
        </div>

        <div 
          className="bg-zinc-800 rounded-lg p-4 text-xs text-zinc-400 space-y-2"
          style={{ 
            backgroundColor: '#27272a', 
            borderRadius: '0.5rem', 
            padding: '1rem',
            fontSize: '0.75rem',
            color: '#a1a1aa',
            marginTop: '1.5rem'
          }}
        >
          <h3 
            className="text-white font-semibold mb-2"
            style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}
          >
            Quick Guide
          </h3>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click a gate</span> to add it</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click gate once</span> to select</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click again</span> to enter drag mode</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Move mouse</span> to position</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click again</span> to drop</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click output pin</span> to start wire</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Click input pin</span> to connect</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Scroll wheel</span> to zoom</div>
          <div style={{ marginTop: '0.5rem' }}>• <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>Press SPACE</span> to simulate</div>
        </div>
      </div>
    </div>
  );
}
