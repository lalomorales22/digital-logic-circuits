'use client';

import { CircuitCanvas } from './components/CircuitCanvas';
import { Toolbar } from './components/Toolbar';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { DemoCircuit } from './components/DemoCircuit';
import { InfoOverlay } from './components/InfoOverlay';

export default function Home() {
  return (
    <div 
      className="relative w-screen h-screen bg-zinc-950 overflow-hidden"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#09090b',
        overflow: 'hidden'
      }}
    >
      <KeyboardShortcuts />
      <DemoCircuit />
      <InfoOverlay />
      <Toolbar />
      <div 
        className="ml-80 w-[calc(100vw-320px)] h-full"
        style={{
          marginLeft: '320px',
          width: 'calc(100vw - 320px)',
          height: '100%'
        }}
      >
        <CircuitCanvas />
      </div>
    </div>
  );
}
