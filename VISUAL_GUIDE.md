# 🎨 Visual Guide - 3D Gate Shapes & Controls

## 🎭 Gate Shape Reference

### Visual Identification Guide

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  INPUT (🟢 Green)                OUTPUT (🟠 Orange)     │
│  ┌─────┐                          ▲                    │
│  │     │  Hexagonal                │  Hexagonal         │
│  │     │  Cylinder                 │  Cone              │
│  └─────┘  (6-sided)               ╱│╲ (Points up)      │
│                                   ╱ │ ╲                 │
│                                  ────────               │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  AND (🔵 Blue)                    OR (🟣 Purple)        │
│  ┌─────────┐                     ╭───────╮             │
│  │         │  Rectangular       (         ) Ellipsoid  │
│  │         │  Box               (         ) Sphere     │
│  └─────────┘                     ╰───────╯             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  NOT (🔴 Red)                    NAND (🔵 Cyan)         │
│      ▲                               ◆                  │
│     ╱◆╲   Diamond                   ╱ ╲ Octahedron     │
│    ╱   ╲  Pyramid                 ◀   ▶ (8-sided)      │
│   ╱_____╲ (Rotated)                 ╲ ╱ Diamond        │
│                                       ◆                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  NOR (🟣 Pink)                   XOR (🟢 Teal)          │
│     ___                              ╱                  │
│   ╱     ╲   Torus                   ╱  Crossed         │
│  (   ●   )  + Sphere               ╱●  Bars            │
│   ╲_____╱   (Donut)               ╱    + Sphere        │
│                                   ╱                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  XNOR (🟠 Orange)                                       │
│  ╱╲                                                     │
│ ║  ║  Tapered                                          │
│ ║  ║  Cylinder                                         │
│ ╲  ╱  (Wider at base)                                  │
│  ══                                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 Interactive Controls Guide

### 🖱️ Gate Manipulation

#### **Moving Gates** (3-Click System)
```
Click 1: SELECT
┌─────────┐
│  GATE   │  ← Yellow ring appears
└─────────┘     (Gate is selected)
    🟡

Click 2: DRAG MODE
┌─────────┐
│  GATE   │  ← Green ring appears
└─────────┘     (Ready to move)
    🟢

Move mouse: Gate follows cursor
    ↓
    ↓   Gates snap to grid (0.5 units)
    ↓

Click 3: DROP
┌─────────┐
│  GATE   │  ← Gate placed in new position
└─────────┘     Yellow ring remains (still selected)
    🟡
```

#### **Resizing Gates**
```
Step 1: Select gate (yellow ring)
   🟡

Step 2: Hold SHIFT + Scroll mouse wheel

   Scroll UP    ──▶  Gate grows (up to 3x)
   ╔═══════════╗
   ║   GATE    ║  Scale: 2.0x
   ╚═══════════╝

   Scroll DOWN  ──▶  Gate shrinks (down to 0.5x)
   ┌─────┐
   │ GATE│  Scale: 0.8x
   └─────┘

Scale indicator appears below gate when selected
```

---

## 🔌 Wire Visualization

### Wire States

#### **Inactive Wire** (No Signal)
```
PIN ○─────────────○ PIN
     Gray, thin (4 units)
     50% opacity
```

#### **Active Wire** (Carrying Signal)
```
PIN ●═════════════● PIN
     ║█████████████║  ← Outer glow (20 units, faint)
     ║█████████████║
     ║█████████████║
     ║█▓▓▓▓▓▓▓▓▓▓▓█║  ← Main wire (8 units, green)
     ║█▓▓▓▓▓▓▓▓▓▓▓█║
     ║█▓░░░░░░░░░▓█║  ← Bright core (thin, white)
     
     - Pulses at 5Hz (main wire)
     - Pulses at 3Hz (glow layer)
     - Bright green: #22c55e
```

#### **Connection Preview** (While Wiring)
```
PIN ●- - - - - - - ○ Cursor
     Yellow dashed line (6 units)
     + glow effect (12 units)
     Follows mouse
```

---

## 🎯 Pin Indicators

### Pin States

#### **Inactive Pin**
```
   ○  Simple sphere
      Dark gray (#64748b)
      Size: 0.2 units
```

#### **Active Pin** (Carrying HIGH signal)
```
   ●  Bright sphere + glow ring
  ╱ ╲
 │ ● │  ← Metallic green sphere
  ╲_╱   ← Animated glow ring
      
      Bright green: #22c55e
      High emissive intensity (0.8)
```

---

## 🎨 Material Properties

### Gate Materials
- **Metalness**: 0.6 (shiny, reflective)
- **Roughness**: 0.3 (smooth surface)
- **Transparency**: Varies by state
  - Dragging: 70% opaque
  - Selected/Hovered: 100% opaque
  - Normal: 90% opaque

### Active Gate Effects
- **Emissive Color**: Matches gate color
- **Emissive Intensity**: 0.7 (bright glow)
- **Point Light**: Colored light source (distance: 4 units, intensity: 0.8)

---

## 🔲 Dot Grid System

### Grid Structure
```
●   ●   ●   ●   ●   ●   ●   ●     Small dots
                                  (every 0.5 units)
●   ●   ●   ●   ●   ●   ●   ●     Color: #52525b
                                  Size: 0.08 units
●   ●   ●   ●   ●   ●   ●   ●     Opacity: 40%

● • • • ● • • • ● • • • ● • • •   Large dots at
• • • • • • • • • • • • • • • •   intersections
• • • • • • • • • • • • • • • •   (every 5 units)
• • • • • • • • • • • • • • • •   Size: 0.15 units
● • • • ● • • • ● • • • ● • • •

Grid extends infinitely in all directions
```

### Snapping Behavior
- Gates snap to **0.5 unit** grid
- Provides precise alignment
- Large dots mark major (5-unit) sections

---

## 🌈 Color-Coded Pin Connections

### Gate I/O Layout
```
        Left Side          Right Side
        (Inputs)           (Outputs)

           ○               ●
         ╔════╗
      ○  ║GATE║  ●     2-input gate
         ╚════╝
           ○               ●


           ○           ●   1-input gate
         ╔════╗
         ║GATE║
         ╚════╝


             ╔════╗
             ║GATE║  ●   0-input gate (INPUT)
             ╚════╝


           ○             1-output gate
         ╔════╗
         ║GATE║
         ╚════╝
                          0-output gate (OUTPUT)
```

---

## 🎹 Keyboard Shortcuts

| Key | Action | Visual Feedback |
|-----|--------|-----------------|
| `SPACE` | Run simulation | Wires light up, gates pulse |
| `ESC` | Cancel connection | Preview line disappears |
| `DELETE` | Remove gate | Gate fades out |
| `BACKSPACE` | Remove gate | Gate fades out |
| `CMD/CTRL + K` | Clear circuit | All elements fade out |
| `SHIFT + Scroll` | Resize gate | Scale indicator updates |

---

## 💡 Visual Feedback System

### Selection States
| State | Visual | Ring Color | Ring Size |
|-------|--------|------------|-----------|
| Unselected | Normal opacity | None | - |
| Selected | Full opacity | Yellow 🟡 | 1.5-1.7x gate |
| Dragging | 70% opacity | Green 🟢 | 1.5-1.8x gate |
| Hovered | Full opacity | None | - |

### Signal States
| Element | OFF State | ON State |
|---------|-----------|----------|
| Gate | Base color, no glow | Bright + emissive + point light |
| Wire | Gray, thin (4) | Green, thick (8) + triple glow |
| Pin | Dark gray sphere | Bright green sphere + ring |

---

## 🎬 Animation Reference

### Pulse Speeds
- **Gates**: 3 Hz sine wave (slow pulse)
- **Wires (main)**: 5 Hz sine wave (fast pulse)
- **Wires (glow)**: 3 Hz sine wave (slow pulse)

### Pulse Characteristics
- **Gates**: Scale increases 5% at peak
- **Wire main**: Opacity varies 30% (70%-100%)
- **Wire glow**: Opacity varies 20% (60%-80%)

---

## 📐 Size Reference

### Default Sizes
- **Gate body**: ~1.5-2 units wide
- **Pin size**: 0.2 unit radius
- **Wire thickness**: 4-8 units
- **Grid spacing**: 0.5 units (small), 5 units (large)

### Scale Factors
- **Minimum**: 0.5x (half size)
- **Default**: 1.0x (normal)
- **Maximum**: 3.0x (triple size)

### Pin Offsets
- **Horizontal**: ±1.5 units × scale
- **Vertical**: ±0.8 units × scale (for 2-pin gates)

---

## 🎨 Quick Color Reference

| Gate | Color Name | Hex Code | Material |
|------|-----------|----------|----------|
| INPUT | Emerald | #10b981 | Metallic |
| OUTPUT | Amber | #f59e0b | Metallic |
| AND | Blue | #3b82f6 | Metallic |
| OR | Violet | #8b5cf6 | Metallic |
| NOT | Red | #ef4444 | Metallic |
| NAND | Cyan | #06b6d4 | Metallic |
| NOR | Pink | #ec4899 | Metallic |
| XOR | Teal | #14b8a6 | Metallic |
| XNOR | Orange | #f97316 | Metallic |

### System Colors
| Element | Color | Hex Code |
|---------|-------|----------|
| Active Signal | Green | #22c55e |
| Inactive | Gray | #64748b |
| Selection Ring | Yellow | #fbbf24 |
| Drag Ring | Green | #22c55e |
| Preview Wire | Yellow | #fbbf24 |
| Grid Dots | Zinc | #52525b |
| Background | Black | #09090b |

---

**Pro Tips:**
1. 🎯 Use gate resizing to create visual hierarchy in complex circuits
2. 💡 The bright wires make signal flow easy to trace
3. 🔲 Align gates to major dots (every 5 units) for cleaner layouts
4. 🖱️ Right-click to pan if left-click conflicts with gate selection
5. 🎨 Different shapes make gate types instantly recognizable at any zoom level

---

**Last Updated:** October 26, 2025
