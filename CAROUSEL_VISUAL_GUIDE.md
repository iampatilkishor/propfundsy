# Carousel Visual Guide

## Desktop Layout (1200px)

```
╔════════════════════════════════════════════════════════════════════════════╗
║                    This Week's Featured Offers                             ║
║              Exclusive discounts from our verified partners                 ║
║                                                                             ║
║  ‹  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ › ║
║     │              │  │              │  │              │  │          │   ║
║     │   TheSers    │  │ FundingPips  │  │ Alpha Cap.   │  │  Smith   │   ║
║     │              │  │              │  │   Group      │  │          │   ║
║     │  USE CODE    │  │  USE CODE    │  │  USE CODE    │  │ USE CODE │   ║
║     │   MZDXS0     │  │  68AD0454    │  │   OCG8P      │  │  da5     │   ║
║     │              │  │              │  │              │  │          │   ║
║     │ Claim ▶      │  │ Claim ▶      │  │ Claim ▶      │  │ Claim ▶  │   ║
║     └──────────────┘  └──────────────┘  └──────────────┘  └──────────┘   ║
║                                                                             ║
║                        ● ● ● ● ● ●                                         ║
║            (dots are clickable, gold dot = active card)                   ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════╝
```

## Button Styling

### Arrow Buttons
```
┌─────────────────────────────────────────────────────────┐
│ DEFAULT STATE                                           │
│  ‹  (gray border, dark background)                     │
│  ›  (gray border, dark background)                     │
│                                                         │
│ HOVER STATE                                             │
│  ‹  (gold border, bright background, +5% scale)       │
│  ›  (gold border, bright background, +5% scale)       │
│                                                         │
│ DISABLED STATE (at ends)                                │
│  ‹  (opacity: 0.4, cursor: not-allowed)               │
│  ›  (opacity: 0.4, cursor: not-allowed)               │
└─────────────────────────────────────────────────────────┘
```

### Dot Indicators
```
┌─────────────────────────────────────────────────────────┐
│ DEFAULT (inactive)              ACTIVE (current card)   │
│         ●                              ▬                 │
│      8px diameter                  24px wide × 8px tall │
│      Gray (muted)                  Gold background      │
│      Clickable                     Rounded rect shape    │
└─────────────────────────────────────────────────────────┘

Spacing: 8px between inactive dots, 6px on tablet, 5px on mobile
```

## Interaction Flow

### Scenario 1: User on First Card
```
Card 1 (Active)  →  [‹ DISABLED]  →  Arrows visible, can only go right
                 →  Dots: [▬ ● ● ● ● ●]  (First dot active)
```

### Scenario 2: User Clicks Right Arrow
```
Smooth scroll animation (300ms)
     ↓
Card 2 (Active)  →  [‹ ENABLED]  →  Both arrows now functional
                 →  Dots: [● ▬ ● ● ● ●]  (Second dot active)
```

### Scenario 3: User Clicks Center Dot
```
Smooth scroll animation (300ms)
     ↓
Card 3 (Active)  →  [‹ ENABLED]  →  Both arrows functional
                 →  Dots: [● ● ▬ ● ● ●]  (Third dot active)
```

### Scenario 4: User on Last Card
```
Card 6 (Active)  →  [› DISABLED]  →  Arrows visible, can only go left
                 →  Dots: [● ● ● ● ● ▬]  (Last dot active)
```

## Mobile Responsive

### Tablet (768px)
```
‹  [Card]  [Card]  [Card]  [Partial]  ›
   (40px arrows, 290px cards)
           ● ● ● ● ● ●
```

### Mobile (480px)
```
‹  [Card]  [Partial]  ›
   (36px arrows, 270px cards)
        ● ● ● ● ● ●
```

## CSS Variables Used

```css
--bg: #0a0e17              /* Dark background */
--bg2: #0e1420             /* Slightly lighter bg */
--border: #1e293b          /* Border color */
--border-hi: #2d3b52       /* Highlighted border */
--text: #e7ecf4            /* Text color */
--muted: #8b98ad           /* Muted/secondary text */
--gold: #d4af6a            /* Accent/active color */
--gold-hi: #e9cf96         /* Highlighted gold */
```

## Accessibility Features

- ✅ Arrow buttons have `aria-label` attributes
- ✅ Dot buttons have `aria-label` and `aria-current`
- ✅ Buttons are keyboard accessible (Tab to focus)
- ✅ Disabled buttons have reduced opacity (UX signal)
- ✅ High contrast between active/inactive states
- ✅ Touch targets are 44px+ (mobile friendly)

## Animation Details

### Smooth Scroll
```javascript
scrollContainerRef.current.scrollTo({
  left: scrollPosition,
  behavior: "smooth"  // ~300-400ms animation
});
```

### Button Hover
```css
transform: scale(1.05);  /* 5% enlarge on hover */
transition: all .2s;      /* 200ms animation */
```

### Dot Active State
```css
width: 8px → 24px;        /* Expands to pill shape */
background: muted → gold;  /* Color change */
transition: all .3s;       /* 300ms animation */
```

---

## Example User Journey

```
1. Page loads
   ├─ User sees carousel with 6 offer cards
   ├─ First card is highlighted (gold dot)
   └─ Previous arrow is disabled

2. User clicks right arrow (›)
   ├─ Carousel smoothly scrolls to card 2
   ├─ Arrow button animates (slight scale up)
   └─ Second dot becomes gold/active

3. User hovers over dot #4
   ├─ Dot enlarges slightly (hover effect)
   └─ Changes to cursor: pointer

4. User clicks dot #4
   ├─ Carousel smoothly scrolls to card 4
   ├─ Fourth dot becomes active (gold pill)
   └─ Both arrows are enabled

5. User clicks left arrow (‹) multiple times
   ├─ Each click scrolls back one card
   ├─ Dots update to reflect position
   └─ Left arrow disables when reaching card 1

6. No scrollbar visible at any point
   └─ Clean, professional carousel UI
```

---

## Color Scheme

| Element | Normal | Hover | Active | Disabled |
|---------|--------|-------|--------|----------|
| Arrow button | `--bg2` border | `--gold` | N/A | opacity 0.4 |
| Arrow button bg | `--bg2` | `--border-hi` | N/A | opacity 0.4 |
| Dot (inactive) | `muted` gray | `muted` (70%) | N/A | N/A |
| Dot (active) | `--gold` | N/A | `--gold` | N/A |

