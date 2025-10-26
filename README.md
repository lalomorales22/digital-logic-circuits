# 🔌 3D Digital Logic Circuit Designer

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, interactive 3D logic circuit designer built with Next.js, React Three Fiber, and TypeScript. Build and simulate complex digital logic circuits with beautiful 3D visualizations and real-time signal propagation - similar to Digital, but in your browser with stunning 3D graphics!

![Logic Circuit Designer](https://via.placeholder.com/1200x600/09090b/ffffff?text=3D+Logic+Circuit+Designer)

## ✨ Features

### 🎨 Beautiful 3D Visualization
- **Interactive 3D Gates**: All standard logic gates rendered as smooth 3D objects with unique colors
- **Top-Down View**: Fixed orthographic camera for precise circuit building
- **Glowing Effects**: Gates and wires glow when carrying HIGH signals
- **Animated Wires**: Bezier curve connections with pulsing animations
- **Infinite Grid**: Professional grid system for perfect alignment

### ⚡ Logic Gates Included
| Gate | Color | Function | Inputs |
|------|-------|----------|--------|
| 🟢 INPUT | Emerald | User-controlled signal source | 0 |
| 🟠 OUTPUT | Amber | Display circuit result | 1 |
| 🔵 AND | Blue | Both inputs must be HIGH | 2 |
| 🟣 OR | Violet | At least one input HIGH | 2 |
| 🔴 NOT | Red | Inverts the input signal | 1 |
| 🔵 NAND | Cyan | NOT AND operation | 2 |
| 🟣 NOR | Pink | NOT OR operation | 2 |
| 🟢 XOR | Teal | Exactly one input HIGH | 2 |
| 🟠 XNOR | Orange | Both inputs equal | 2 |

### 🎮 Intuitive Controls
- **Click-to-Place**: Add gates with a single click
- **Click-Move-Click**: Select gate → enter drag mode → position → drop
- **Pin Connections**: Click output pin → click input pin to wire
- **Toggle Inputs**: Click INPUT gate pins to toggle HIGH/LOW
- **Real-time Simulation**: Press SPACE to propagate signals

### 🎯 Advanced Features
- ✅ **Real-time Circuit Simulation** with BFS algorithm
- ✅ **Visual Signal Flow** with animated wires
- ✅ **Grid Snapping** for clean layouts
- ✅ **Keyboard Shortcuts** for fast workflow
- ✅ **Modern Dark UI** with color-coded components
- ✅ **Connection Preview** when wiring gates
- ✅ **Contextual Help** overlay with tips

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/lalomorales22/digital-logic-circuits.git
cd digital-logic-circuits

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start building circuits!

## 📖 How to Use

### Adding Gates
1. Click any gate button in the left sidebar
2. The gate appears in the center of the canvas

### Moving Gates
1. **Click once** on a gate to select it (yellow ring)
2. **Click again** to enter drag mode (green ring)
3. **Move your mouse** to position the gate
4. **Click once more** to drop it in place

### Connecting Gates
1. Click an **output pin** (right side, sphere) to start a wire
2. A yellow dashed preview line follows your cursor
3. Click an **input pin** (left side) to complete the connection
4. Press `ESC` to cancel

### Running Simulations
1. Set your INPUT gates by clicking their output pins (toggle ON/OFF)
2. Connect all your gates with wires
3. Press `SPACE` or click **"Run Simulation"**
4. Watch signals propagate through your circuit!

### Camera Controls
- **Scroll Wheel**: Zoom in/out
- **Middle Click + Drag**: Pan around the workspace
- **Top-Down View**: Fixed for precise 2D circuit building

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `SPACE` | Run circuit simulation |
| `DELETE` / `BACKSPACE` | Remove selected gate |
| `ESC` | Deselect / Cancel connection |
| `CMD/CTRL + K` | Clear entire circuit |

## 💻 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Useful helpers for R3F
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[UUID](https://github.com/uuidjs/uuid)** - Unique identifier generation

## 🏗️ Project Structure

```
digital-logic-circuits/
├── app/
│   ├── components/
│   │   ├── CircuitCanvas.tsx      # Main 3D workspace with Three.js
│   │   ├── LogicGate.tsx          # 3D gate component with pins
│   │   ├── Wire.tsx               # Animated wire connections
│   │   ├── ConnectionPreview.tsx  # Preview wire when connecting
│   │   ├── Toolbar.tsx            # Sidebar with gate library
│   │   ├── InfoOverlay.tsx        # Contextual help messages
│   │   ├── KeyboardShortcuts.tsx  # Global keyboard handlers
│   │   └── DemoCircuit.tsx        # Optional demo loader
│   ├── store/
│   │   └── circuit-store.ts       # Zustand state management
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── public/                         # Static assets
├── types/                          # TypeScript declarations
├── package.json
├── tsconfig.json
└── README.md
```

## 🧠 How It Works

### Circuit Simulation Algorithm

The app uses a **Breadth-First Search (BFS)** algorithm to propagate signals:

1. **Initialize**: Start with all INPUT gates
2. **Evaluate**: Calculate each gate's output based on its logic function
3. **Propagate**: Send signals through wires to connected gates
4. **Update**: Update visual state (colors, glow effects)
5. **Repeat**: Continue until all reachable gates are evaluated

```typescript
// Example: AND gate evaluation
const evaluateAND = (inputs: boolean[]) => {
  return inputs.every(signal => signal === true);
};
```

### Gate Logic Functions

| Gate | Logic Function |
|------|----------------|
| AND | All inputs must be HIGH |
| OR | At least one input HIGH |
| NOT | Inverts the input |
| NAND | NOT (All inputs HIGH) |
| NOR | NOT (Any input HIGH) |
| XOR | Exactly one input HIGH |
| XNOR | Both inputs equal |

## 🎓 Example Circuits

### Half Adder
Adds two binary digits and outputs Sum and Carry.

**Components:**
- 2 INPUT gates (A, B)
- 1 XOR gate (Sum = A ⊕ B)
- 1 AND gate (Carry = A ∧ B)
- 2 OUTPUT gates

### SR Latch
Basic memory element that stores one bit.

**Components:**
- 2 INPUT gates (Set, Reset)
- 2 NOR gates (cross-coupled)
- 2 OUTPUT gates (Q, Q̄)

### Full Adder
Adds three binary digits (A, B, Carry-in).

**Components:**
- 3 INPUT gates
- 2 XOR gates
- 2 AND gates
- 1 OR gate
- 2 OUTPUT gates (Sum, Carry-out)

## 🎨 Visual Features

- **🌈 Color-Coded Gates**: Each gate type has a unique color
- **✨ Glow Effects**: Active gates emit light when HIGH
- **🔆 Animated Wires**: Signals flow with pulsing animations
- **🎯 Selection Rings**: Visual feedback for selected/dragging states
- **📏 Grid Snapping**: Objects align to grid for clean layouts
- **💫 Smooth Transitions**: All movements are animated

## 🔮 Roadmap

- [ ] **Save/Load Circuits** - JSON export/import
- [ ] **Subcircuits** - Create reusable custom components
- [ ] **Truth Tables** - Generate truth tables from circuits
- [ ] **Timing Diagrams** - Visualize signal changes over time
- [ ] **More Gates** - Multiplexers, decoders, flip-flops
- [ ] **Wire Labels** - Annotate connections
- [ ] **Undo/Redo** - History management
- [ ] **Multi-Select** - Bulk operations
- [ ] **Circuit Templates** - Pre-built example library
- [ ] **Share Circuits** - Generate shareable links
- [ ] **Dark/Light Themes** - Theme customization
- [ ] **Mobile Support** - Touch controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Digital](https://github.com/hneemann/Digital) - The excellent digital logic designer
- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - Amazing 3D in React
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- State management by [Zustand](https://github.com/pmndrs/zustand)

## 👨‍💻 Author

**Lalo Morales**
- GitHub: [@lalomorales22](https://github.com/lalomorales22)
- Repository: [digital-logic-circuits](https://github.com/lalomorales22/digital-logic-circuits)

## 📸 Screenshots

### Main Interface
> Colorful sidebar with 9 logic gate types and a 3D canvas with infinite grid

### Building a Circuit
> Gates connected with animated wires, showing signal flow in real-time

### Running Simulation
> Active gates glowing green, signals propagating through the circuit

---

**⭐ Star this repo if you find it useful!**

Built with ❤️ using React Three Fiber, Next.js, and TypeScript
