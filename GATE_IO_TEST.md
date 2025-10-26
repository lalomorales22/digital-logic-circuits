# Gate Input/Output Verification

## Expected I/O for Each Gate Type

| Gate Type | Inputs | Outputs | Notes |
|-----------|--------|---------|-------|
| INPUT     | 0      | 1       | Source of signals, no inputs needed |
| OUTPUT    | 1      | 0       | Display only, receives signal |
| AND       | 2      | 1       | Both inputs must be HIGH |
| OR        | 2      | 1       | At least one input HIGH |
| NOT       | 1      | 1       | Inverts single input |
| NAND      | 2      | 1       | NOT AND operation |
| NOR       | 2      | 1       | NOT OR operation |
| XOR       | 2      | 1       | Exclusive OR, exactly one HIGH |
| XNOR      | 2      | 1       | Exclusive NOR, inputs equal |

## Current Implementation (circuit-store.ts)

```typescript
const inputCount = type === 'INPUT' ? 0 : type === 'NOT' ? 1 : type === 'OUTPUT' ? 1 : 2;
const outputCount = type === 'OUTPUT' ? 0 : 1;
```

### Breakdown:
- **INPUT**: 0 inputs, 1 output ✓
- **OUTPUT**: 1 input, 0 outputs ✓
- **NOT**: 1 input, 1 output ✓
- **AND, OR, NAND, NOR, XOR, XNOR**: 2 inputs, 1 output ✓

## Status: ✅ ALL CORRECT

The current implementation is correct. All gates have the proper number of inputs and outputs according to standard digital logic conventions.

## Testing Checklist

To verify in the browser:
1. Add each gate type to the canvas
2. Count the pins on the left (inputs) and right (outputs)
3. Verify against the table above

### Visual Check:
- Left side of gate = Input pins (circles on left)
- Right side of gate = Output pins (circles on right)
- INPUT gate should have NO left pins, ONE right pin
- OUTPUT gate should have ONE left pin, NO right pins
- NOT gate should have ONE left pin, ONE right pin
- All others should have TWO left pins, ONE right pin

## If Issues Found:

Please specify which gate types have incorrect I/O and I'll fix them immediately.

Example:
- "AND gate shows 3 inputs instead of 2"
- "OUTPUT gate has an output pin"
- "NOT gate has 2 inputs"
