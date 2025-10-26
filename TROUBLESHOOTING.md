# 🔧 Troubleshooting & Tips

## Common Issues & Solutions

### 🎯 Gate Movement Issues

#### **Problem: Can't move gate**
✅ **Solution:**
1. Click gate once to select (yellow ring should appear)
2. Click again to enter drag mode (green ring should appear)
3. Now move your mouse - gate should follow
4. Click once more to drop

**Note:** If gate is already selected (yellow ring visible), you only need one click to enter drag mode.

---

#### **Problem: Gate jumps to wrong position**
✅ **Solution:**
- Gates snap to 0.5-unit grid automatically
- This is intentional for precise alignment
- To place gate at exact position, position cursor where you want it, then click to drop
- The gate will snap to nearest 0.5-unit mark

---

### 📏 Resizing Issues

#### **Problem: Can't resize gate**
✅ **Solution:**
1. First, **select the gate** (click once, yellow ring appears)
2. Hold **SHIFT key** (important!)
3. Scroll mouse wheel up/down
4. Scale indicator should appear below gate

**Common mistake:** Forgetting to hold SHIFT key

---

#### **Problem: Gate size won't change**
✅ **Check:**
- Gate is selected (yellow ring visible)
- SHIFT key is held down
- You're scrolling mouse wheel (not clicking)
- Gate hasn't reached min (0.5x) or max (3.0x) limit

---

### 🔌 Wire Connection Issues

#### **Problem: Can't connect wires**
✅ **Solution:**
1. Click **OUTPUT pin** (right side of gate) first
2. Yellow preview line should follow cursor
3. Click **INPUT pin** (left side of gate) to complete
4. Wire should appear

**Order matters:** Always output → input, not input → output

---

#### **Problem: Preview line doesn't appear**
✅ **Check:**
- You clicked an OUTPUT pin (spheres on right side)
- The pin you clicked is actually part of a gate
- No other connection is active

✅ **Cancel current connection:**
- Press `ESC` key to cancel and try again

---

#### **Problem: Connection won't complete**
✅ **Possible causes:**
1. **Wrong pin type** - Make sure you're clicking an INPUT pin (left side)
2. **Pin already connected** - Each input can only have one wire
3. **Connecting to same gate** - Can't connect gate to itself
4. **Clicked outside pin** - Need to click directly on the sphere

---

### 🎨 Visual Issues

#### **Problem: Wires look dim/thin**
✅ **This is normal for inactive wires:**
- **Inactive wires** (no signal): Gray, thin (4 units)
- **Active wires** (carrying signal): Bright green, thick (8 units) with glow

✅ **To see bright wires:**
1. Set INPUT gates to ON (click their output pins)
2. Press `SPACE` to run simulation
3. Connected gates should light up
4. Wires carrying signals will be bright green and thick

---

#### **Problem: Can't see grid dots**
✅ **Solutions:**
- Zoom in closer (scroll wheel up)
- Grid dots are subtle by design (#52525b, 40% opacity)
- Look for larger dots at 5-unit intervals
- Check background - should be dark (#09090b)

---

#### **Problem: Gates look flat/not 3D**
✅ **Check lighting:**
- Should have multiple light sources
- Rotate camera slightly (oh wait, camera is locked!)
- Look for shadows and highlights on gate surfaces
- Active gates should emit colored light

---

### 🎮 Navigation Issues

#### **Problem: Can't pan camera**
✅ **Solutions:**
- **Left-click + drag** on empty space (not on gate)
- **Right-click + drag** anywhere
- **Middle-click + drag** for zoom (alternative to scroll)

**Tip:** Click on empty grid area to avoid selecting gates

---

#### **Problem: Can't zoom in/out enough**
✅ **Current zoom range:** 5x to 100x
- If you need more zoom, this is the current limit
- Zoom out to see entire circuit
- Zoom in to work on details

---

#### **Problem: Lost in infinite canvas**
✅ **To return to center:**
1. Delete all gates or use camera reset (not implemented yet)
2. Or navigate back manually using pan controls
3. Look for your gates and pan toward them

**Tip:** Keep gates relatively centered for easier navigation

---

### ⚡ Simulation Issues

#### **Problem: Simulation doesn't work**
✅ **Check:**
1. **INPUT gates are set** - Click OUTPUT pins to toggle ON
2. **Wires are connected** - Complete circuit from INPUT to OUTPUT
3. **Press SPACE** - This runs the simulation
4. **Wait a moment** - Signals propagate instantly but animations take time

---

#### **Problem: Output shows wrong result**
✅ **Verify:**
- Logic gates are correct type
- All inputs are connected properly
- INPUT values are set correctly
- Circuit logic is sound

✅ **Debug steps:**
1. Start with simple 2-gate circuit
2. Test each gate individually
3. Verify truth table for each gate type
4. Check for disconnected wires

---

#### **Problem: Signals don't propagate**
✅ **Common causes:**
1. **Incomplete circuit** - Path from INPUT to OUTPUT broken
2. **No INPUT signals** - Set at least one INPUT to ON
3. **Wrong wire direction** - Must go output → input
4. **Floating gate** - Gate with no inputs will stay OFF

---

### 🎨 Performance Issues

#### **Problem: Laggy/slow performance**
✅ **Solutions:**
1. **Reduce gate count** - Remove unnecessary gates
2. **Simplify circuit** - Break into smaller sections
3. **Close other apps** - Free up system resources
4. **Reduce browser tabs** - Three.js needs GPU resources

---

#### **Problem: Browser freezes on simulation**
✅ **Possible causes:**
1. **Circular logic** - Gate connected to itself directly/indirectly
2. **Too many gates** - Thousands of gates may cause issues
3. **Oscillating circuit** - Feedback loops can cause problems

---

## 💡 Pro Tips

### Efficient Circuit Building

1. **Plan first, build second**
   - Sketch circuit on paper
   - Identify major components
   - Group related gates

2. **Use visual hierarchy**
   - Make important gates larger (Shift+Scroll)
   - Use INPUT/OUTPUT gates at edges
   - Align gates to major grid dots

3. **Keep wires short**
   - Position gates close to connected gates
   - Reduce wire crossings
   - Cleaner circuits are easier to debug

4. **Test incrementally**
   - Build small sections
   - Test each section
   - Connect sections last
   - Don't wait until end to test!

---

### Keyboard Shortcuts Quick Reference

| Action | Shortcut | When to Use |
|--------|----------|-------------|
| Run simulation | `SPACE` | After connecting circuit |
| Cancel connection | `ESC` | While connecting wires |
| Delete gate | `DELETE` or `BACKSPACE` | Gate selected |
| Clear circuit | `CMD/CTRL + K` | Start fresh |
| Resize gate | `SHIFT + Scroll` | Gate selected |

---

### Visual Design Tips

1. **Color coding works!**
   - Each gate type has unique color
   - Use this for quick identification
   - No need to read labels at distance

2. **Size indicates importance**
   - Scale up critical gates (outputs, complex logic)
   - Scale down utility gates (simple buffers)
   - Default size for most gates

3. **Grid alignment**
   - Snap to major dots (5 units) for main components
   - Use minor dots (0.5 units) for fine adjustment
   - Aligned circuits look professional

4. **Signal flow direction**
   - Left to right is intuitive
   - Inputs on left, outputs on right
   - Match gate pin positions

---

## 🐛 Known Limitations

1. **No undo/redo yet** - Be careful with deletions!
2. **No save/load** - Circuit is lost on refresh
3. **No subcircuits** - Can't group gates into modules
4. **No wire labels** - Can't name connections
5. **Camera locked top-down** - No 3D rotation (by design)
6. **No touch support** - Desktop only for now

---

## 📊 Gate Truth Tables

### Basic Gates

#### AND
| A | B | Out |
|---|---|-----|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

#### OR
| A | B | Out |
|---|---|-----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

#### NOT
| A | Out |
|---|-----|
| 0 | 1 |
| 1 | 0 |

### Compound Gates

#### NAND
| A | B | Out |
|---|---|-----|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### NOR
| A | B | Out |
|---|---|-----|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

#### XOR
| A | B | Out |
|---|---|-----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

#### XNOR
| A | B | Out |
|---|---|-----|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

---

## 🆘 Still Having Issues?

### Debug Checklist

- [ ] Browser is up to date (Chrome/Firefox/Safari)
- [ ] WebGL is enabled in browser
- [ ] GPU drivers are current
- [ ] JavaScript is enabled
- [ ] Console shows no errors (F12 → Console tab)
- [ ] Page fully loaded (check network tab)
- [ ] No browser extensions interfering
- [ ] Tried refreshing page (F5)
- [ ] Tried hard refresh (Ctrl+F5 / Cmd+Shift+R)

### Getting Help

1. **Check Console** - Press F12, look for red errors
2. **Take Screenshot** - Show what you're seeing
3. **Describe Steps** - What did you do before issue occurred?
4. **Check Network** - Is app loading all files?

### Common Console Errors

```
TypeError: Cannot read property 'id' of undefined
→ Gate was deleted but still referenced
→ Solution: Refresh page

WebGL context lost
→ GPU issue or too many resources
→ Solution: Close other tabs, restart browser

Failed to fetch
→ Network/loading issue
→ Solution: Check internet, refresh page
```

---

## 📱 Browser Compatibility

### ✅ Fully Supported
- Chrome 90+ (recommended)
- Firefox 88+
- Edge 90+
- Safari 14+

### ⚠️ Limited Support
- Mobile browsers (touch not optimized)
- Older browser versions (WebGL may be slow)

### ❌ Not Supported
- IE 11 (no WebGL 2)
- Very old mobile devices

---

## 🎓 Learning Resources

### Understanding Logic Gates
1. Start with INPUT and OUTPUT
2. Add a NOT gate - see inversion
3. Try AND - both inputs must be HIGH
4. Try OR - either input HIGH
5. Build half adder (XOR + AND)
6. Build full adder
7. Create complex circuits!

### Example Circuit: Half Adder
```
INPUT A ──┬───────────── XOR ──── OUTPUT (Sum)
          │             ╱
          │            ╱
          │           ╱
INPUT B ──┼──────────╱
          │
          └───────────── AND ──── OUTPUT (Carry)
```

**Try building this!** It adds two binary digits.

---

**Last Updated:** October 26, 2025  
**Version:** 2.0 - 3D Enhancement Release
