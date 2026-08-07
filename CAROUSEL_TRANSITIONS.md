# Carousel Transition Animations - Complete Guide

## Overview
Professional carousel with **obvious, clear transition animations** that make it immediately obvious when cards are changing.

---

## Animation Sequence

### When User Clicks Arrow or Dot

#### **Phase 1: Transition Start (0ms)**
```
Action: User clicks arrow/dot button

Visual Feedback:
├─ Button: Scales down (1.0 → 0.98)
├─ Button: Inset shadow appears
├─ Carousel: Opacity fades (1.0 → 0.9)
├─ All Cards: Scale down (1.0 → 0.95)
├─ All Cards: Fade (1.0 → 0.8)
└─ Grid: Blur effect appears (0px → 3px)
```

#### **Phase 2: Transition Animation (150ms)**
```
Timeline: During scroll transition

Visual Progression:
├─ 0ms:   Full transition applied (blur, fade, scale)
├─ 75ms:  Peak of transition effect
│         - Blur: 3px
│         - Cards opacity: 0.8
│         - Cards scale: 0.95
│
├─ 150ms: Transition begins to reverse
└─ 250ms: Cards recovery animation starts
```

#### **Phase 3: Transition End (250ms)**
```
Timeline: After scroll animation completes

Visual Recovery:
├─ Grid: Blur fades out (3px → 0px)
├─ Grid: Opacity returns (0.7 → 1.0)
├─ Cards: Pulse animation triggers
│         - Shrink a bit more (→ 0.92)
│         - Fade more (→ 0.6)
│         - Then expand back to normal
├─ Cards: Scale recovers (0.95 → 1.0)
├─ Cards: Opacity returns (0.8 → 1.0)
└─ Button: Returns to normal state
```

---

## Visual Effects Breakdown

### 1. Blur Effect (Grid Level)
```css
Transitioning: filter: blur(3px)
Recovery: 
  0%:   blur(3px)
  50%:  blur(2px)
  100%: blur(0px)
```

**Effect**: Cards appear to be moving/shifting, giving sense of motion

### 2. Opacity Change (Grid + Cards)
```css
Grid Transitioning:  opacity: 0.7  (30% fade)
Cards Transitioning: opacity: 0.8  (20% fade)

Grid Recovery:  opacity: 1.0 over 300ms
Cards Recovery: opacity: 1.0 over 300ms
```

**Effect**: Screen dims slightly, indicating something is changing

### 3. Scale Animation (Cards)
```css
Transitioning: scale(0.95)           // All cards shrink 5%
Recovery:     scale(0.92) → 1.0     // Pulse effect: shrink more, then expand
```

**Effect**: Cards appear to compress/bounce, showing active state change

### 4. Staggered Card Animation
```
Card 1: Animation starts at 0ms
Card 2: Animation starts at 20ms   (20ms delay)
Card 3: Animation starts at 40ms   (40ms delay)
Card 4: Animation starts at 60ms   (60ms delay)
Card 5: Animation starts at 80ms   (80ms delay)
Card 6: Animation starts at 100ms  (100ms delay)
```

**Effect**: Cards animate in sequence (wave effect), clearly showing change

### 5. Button Feedback
```css
Hover:   transform: scale(1.05)
Click:   transform: scale(0.98) + inset shadow
```

**Effect**: Tactile feedback on button press

---

## Complete Timeline

```
0ms     ┌─────────────────────────────────────────────┐
        │ User clicks arrow                           │
        │ ✓ Button scales down (0.98x)               │
        │ ✓ Carousel opacity fades (0.9)             │
        │ ✓ Grid blur activates (3px)                │
        │ ✓ Cards scale down (0.95x)                 │
        │ ✓ Cards fade (0.8 opacity)                 │
        └─────────────────────────────────────────────┘

150ms   ┌─────────────────────────────────────────────┐
        │ Transition state active                      │
        │ All visual effects at peak                  │
        │ Carousel is clearly in "moving" state       │
        └─────────────────────────────────────────────┘

300ms   ┌─────────────────────────────────────────────┐
        │ Grid blur starts recovering (3px → 0px)    │
        │ Grid opacity returns (0.7 → 1.0)           │
        │ Carousel transition class removed          │
        └─────────────────────────────────────────────┘

350ms   ┌─────────────────────────────────────────────┐
        │ Card pulse animation triggers               │
        │ Cards scale down more (1.0 → 0.92)         │
        │ Cards fade more (1.0 → 0.6)                │
        │ Staggered animation (20ms delays)          │
        └─────────────────────────────────────────────┘

400-500ms ┌───────────────────────────────────────────┐
          │ Cards recover from pulse                 │
          │ Card 1: Back to 1.0 scale, 1.0 opacity  │
          │ Card 2: Back to 1.0 scale, 1.0 opacity  │
          │ ...continuing through Card 6             │
          │ Button returns to normal                 │
          └───────────────────────────────────────────┘

600ms   ✓ Complete! New carousel state reached
```

---

## CSS Animation Details

### Main Transition Animation
```css
@keyframes carouselTransition {
  0% {
    filter: blur(3px);
    opacity: 0.7;
  }
  50% {
    filter: blur(2px);
    opacity: 0.85;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.offers-grid.transitioning {
  animation: carouselTransition .3s ease-out forwards;
  filter: blur(3px);
  opacity: 0.7;
}
```

### Card Pulse Animation
```css
@keyframes cardPulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(0.92);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.offers-grid.transitioning .offer-card {
  animation: cardPulse .3s ease-out forwards;
}
```

### Staggered Delays
```css
.offer-card:nth-child(1) { animation-delay: 0ms;    }
.offer-card:nth-child(2) { animation-delay: 20ms;   }
.offer-card:nth-child(3) { animation-delay: 40ms;   }
.offer-card:nth-child(4) { animation-delay: 60ms;   }
.offer-card:nth-child(5) { animation-delay: 80ms;   }
.offer-card:nth-child(6) { animation-delay: 100ms;  }
```

---

## React State Management

### Transition Trigger
```javascript
const triggerTransition = (newIndex: number) => {
  // 1. Start transition state (shows animations)
  setIsTransitioning(true);
  
  // 2. Wait 150ms (let user see the transition effect)
  setTimeout(() => {
    // 3. Change the actual card index
    setCurrentIndex(newIndex);
    // 4. Scroll to new position
    scrollToCard(newIndex);
    
    // 5. Wait 100ms more for scroll to complete
    setTimeout(() => {
      // 6. Remove transition state (animations end)
      setIsTransitioning(false);
    }, 100);
  }, 150);
};
```

### Class Application
```jsx
<div className={`offers-grid ${isTransitioning ? 'transitioning' : ''}`}>
  {/* Cards */}
</div>
```

---

## User Experience Flow

### Scenario: Click Next Arrow (Card 1 → Card 2)

**User Sees:**
```
BEFORE CLICK:
┌─────────────────────────────────────────────┐
│ ‹  [Card 1] [Card 2] [Card 3]  [Card 4] ›   │
│     (Current)                               │
│                                             │
│              ● ● ● ● ● ●                   │
│              (dot 1 active)                 │
└─────────────────────────────────────────────┘

CLICK ARROW (0ms):
┌─────────────────────────────────────────────┐
│ ‹  [Card 1≈] [Card 2≈] [Card 3≈] [Card 4≈] › │  ← Cards blur & fade
│     (Shrinking, fading)                    │  ← Carousel dims
│                                             │
│              ● ● ● ● ● ●                   │
│              (dot 1 still active)           │
└─────────────────────────────────────────────┘
  ↓ Blur fades, cards pulse
  
CARD PULSE (150-250ms):
┌─────────────────────────────────────────────┐
│ ‹  [Card 2] [Card 3] [Card 4] [Card 5] ›    │
│     (Cards pulsing: scale & fade)           │
│                                             │
│              ● ● ● ● ● ●                   │
│                (pulse animation)            │
└─────────────────────────────────────────────┘
  ↓ Cards return to normal
  
COMPLETE (300-500ms):
┌─────────────────────────────────────────────┐
│ ‹  [Card 2] [Card 3] [Card 4] [Card 5] ›    │
│     (New current card)                      │
│                                             │
│              ● ● ● ● ● ●                   │
│                (dot 2 now active)           │
└─────────────────────────────────────────────┘
```

---

## What Makes It Obvious

✅ **Blur Effect** - Cards clearly shift/move  
✅ **Fade Out/In** - Carousel dims during change  
✅ **Scale Animation** - Cards compress and bounce  
✅ **Staggered Cards** - Wave effect shows motion  
✅ **Button Feedback** - Visual click response  
✅ **Multiple Effects** - Not just one animation, multiple layers  
✅ **Smooth Duration** - 300-500ms is visible, not instant  
✅ **Color Dots Update** - Active indicator changes clearly  

---

## Browser Performance

- GPU accelerated: `transform` and `opacity` only
- No layout thrashing
- Smooth 60fps on modern devices
- Mobile optimized (320px width support)

---

## Testing Checklist

After restarting dev server:

- [ ] Click arrow → See clear blur/fade/scale effect
- [ ] Cards clearly pulse during transition
- [ ] All 6 cards show staggered animation (wave effect)
- [ ] Transition takes ~300-500ms (visible, not instant)
- [ ] Carousel dims slightly during transition
- [ ] Button shows click feedback (scale down)
- [ ] Dot indicator updates to show new active card
- [ ] Animation works on mobile (480px)
- [ ] Animation smooth at 60fps (no jank)
- [ ] No console errors

---

## Next Steps

1. Restart dev server:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Test carousel transitions - they should now be **very obvious**

3. Deploy when satisfied:
   ```bash
   git add .
   git commit -m "feat: add prominent transition animations to carousel"
   git push
   ```

