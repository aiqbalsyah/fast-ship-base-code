# EXAMPLE Design System

⚠️ **This is a PLACEHOLDER file. Delete it and define YOUR design system!**

---

## Brand Identity

### Brand Name
**[Your Product Name]**

### Tagline
"[Your tagline or mission statement]"

### Brand Personality
- Adjective 1 (e.g., Professional)
- Adjective 2 (e.g., Friendly)
- Adjective 3 (e.g., Modern)

---

## Colors

### Primary Colors
```
Primary:    #3B82F6  (Blue 500)
Primary Light: #60A5FA (Blue 400)
Primary Dark:  #2563EB (Blue 600)
```

### Secondary Colors
```
Secondary:     #10B981  (Green 500)
Secondary Light: #34D399 (Green 400)
Secondary Dark:  #059669 (Green 600)
```

### Neutral Colors
```
Gray 50:   #F9FAFB
Gray 100:  #F3F4F6
Gray 200:  #E5E7EB
Gray 300:  #D1D5DB
Gray 400:  #9CA3AF
Gray 500:  #6B7280
Gray 600:  #4B5563
Gray 700:  #374151
Gray 800:  #1F2937
Gray 900:  #111827
```

### Semantic Colors
```
Success:  #10B981  (Green)
Warning:  #F59E0B  (Amber)
Error:    #EF4444  (Red)
Info:     #3B82F6  (Blue)
```

### Background & Surface
```
Background Light:  #FFFFFF
Background Dark:   #111827
Surface Light:     #F9FAFB
Surface Dark:      #1F2937
```

---

## Typography

### Font Families
```
Headings:  Inter, -apple-system, sans-serif
Body:      Inter, -apple-system, sans-serif
Mono:      'JetBrains Mono', 'Fira Code', monospace
```

### Font Sizes
```
xs:   12px / 0.75rem    (Small labels)
sm:   14px / 0.875rem   (Secondary text)
base: 16px / 1rem       (Body text)
lg:   18px / 1.125rem   (Large body)
xl:   20px / 1.25rem    (H4)
2xl:  24px / 1.5rem     (H3)
3xl:  30px / 1.875rem   (H2)
4xl:  36px / 2.25rem    (H1)
5xl:  48px / 3rem       (Hero)
```

### Font Weights
```
Light:    300
Regular:  400
Medium:   500
Semibold: 600
Bold:     700
Extrabold: 800
```

### Line Heights
```
Tight:   1.25   (Headings)
Normal:  1.5    (Body text)
Relaxed: 1.75   (Long-form content)
```

---

## Spacing

Using 4px base unit:

```
0:    0px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

---

## Shadows

```
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
base: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

---

## Border Radius

```
none: 0px
sm:   2px   (Small elements)
base: 4px   (Buttons, inputs)
md:   6px   (Cards)
lg:   8px   (Modals)
xl:   12px  (Large cards)
2xl:  16px  (Hero sections)
full: 9999px (Pills, avatars)
```

---

## Components

### Buttons

**Primary Button**
```
Background: Primary color
Text: White
Padding: 12px 24px
Border radius: base (4px)
Font weight: Semibold
Hover: Primary Dark
Active: Scale 0.98
```

**Secondary Button**
```
Background: Transparent
Text: Primary color
Border: 1px solid Primary
Padding: 12px 24px
Border radius: base (4px)
Hover: Background Primary with 10% opacity
```

**Sizes**
- Small: 8px 16px, text-sm
- Medium: 12px 24px, text-base (default)
- Large: 16px 32px, text-lg

### Input Fields

```
Border: 1px solid Gray 300
Background: White
Padding: 12px 16px
Border radius: base (4px)
Focus: Border Primary, Ring 2px Primary Light

Error State:
Border: Error color
Ring: Error color with opacity
```

### Cards

```
Background: Surface color
Border: 1px solid Gray 200
Border radius: md (6px)
Padding: 24px
Shadow: sm
Hover: shadow-md transition
```

### Modals

```
Background: White
Border radius: lg (8px)
Padding: 32px
Max width: 600px
Shadow: 2xl
Backdrop: Black with 50% opacity
```

---

## Icons

### Icon Library
- **Library:** Lucide Icons or Heroicons
- **Size:** 20px (default), 16px (small), 24px (large)
- **Stroke width:** 2px

### Icon Usage
- Always pair with text labels
- Use consistent sizes within contexts
- Maintain optical balance

---

## Responsive Breakpoints

```
sm:  640px   (Mobile landscape)
md:  768px   (Tablet)
lg:  1024px  (Desktop)
xl:  1280px  (Large desktop)
2xl: 1536px  (Extra large)
```

---

## Animation & Motion

### Durations
```
Fast:    150ms  (Hover states)
Base:    200ms  (Default)
Medium:  300ms  (Modals)
Slow:    500ms  (Page transitions)
```

### Easing
```
Ease in:     cubic-bezier(0.4, 0, 1, 1)
Ease out:    cubic-bezier(0, 0, 0.2, 1)
Ease in-out: cubic-bezier(0.4, 0, 0.2, 1)
```

### Animation Principles
- Use subtle animations
- Prioritize performance
- Respect `prefers-reduced-motion`

---

## Accessibility

### Contrast Ratios
- Normal text: Minimum 4.5:1
- Large text: Minimum 3:1
- UI elements: Minimum 3:1

### Focus States
- Visible focus indicators
- 2px outline with primary color
- Offset by 2px

### Alt Text
- All images have descriptive alt text
- Decorative images use empty alt=""

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Logical tab order
- Skip links for main content

---

## Dark Mode

### Strategy
- System preference default
- User toggle available
- Persistent across sessions

### Color Adjustments
```
Background: Gray 900
Surface: Gray 800
Text Primary: Gray 50
Text Secondary: Gray 400
Borders: Gray 700
```

---

## Grid System

### Layout Grid
```
Columns: 12
Gutter: 24px
Max width: 1280px
Padding: 16px (mobile), 24px (desktop)
```

### Common Layouts
- **Full width:** 12 columns
- **Main + Sidebar:** 8 + 4 columns
- **Three columns:** 4 + 4 + 4 columns

---

## Implementation

### CSS Framework
- Tailwind CSS (utility-first)
- Custom configuration in `tailwind.config.js`

### Component Library
- shadcn/ui (copy-paste components)
- Customized with design tokens

---

## Resources

### Design Files
- Figma: [Link to Figma file]
- Style guide: [Link to style guide]

### Brand Assets
- Logo: `assets/logo.svg`
- Favicon: `public/favicon.ico`

---

**Replace this file with YOUR actual design system!**
