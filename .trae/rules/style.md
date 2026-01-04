---
alwaysApply: false
---

# MotherDuck Frontend Design Rules

## 1. Design Philosophy
- **Style**: Modern, developer-centric, bold, high-contrast.
- **Key Characteristics**: "Duck Yellow" accents, severe dark/light backgrounds, clean typography, performance-oriented feel.

## 2. Color Palette

### Primary Colors
- **Brand Primary**: `#FFE600` (Vibrant Yellow) - Use for CTAs, highlights, active states.
- **Brand Primary Hover**: `#E6CF00`

### Backgrounds
- **Dark Mode (Default/Primary)**:
  - Page Background: `#0A0A0A` (Near Black)
  - Card/Surface: `#171717` or `#262626`
- **Light Mode (Documentation/Secondary)**:
  - Page Background: `#FFFFFF`
  - Card/Surface: `#F9FAFB` (Gray-50)

### Text Colors
- **Dark Mode**:
  - Primary: `#FFFFFF`
  - Secondary: `#A1A1AA` (Gray-400)
- **Light Mode**:
  - Primary: `#111827` (Gray-900)
  - Secondary: `#6B7280` (Gray-500)

### Borders
- **Subtle**: `#333333` (Dark Mode), `#E5E7EB` (Light Mode)
- **Focus Ring**: `#FFE600` (2px solid)

## 3. Typography

### Font Families
- **UI (Sans-serif)**: `Inter`, `San Francisco`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`.
- **Code (Monospace)**: `JetBrains Mono`, `Fira Code`, `Menlo`, `Monaco`, `monospace`.

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Bold**: 600 or 700 (Headings)

### Font Sizes
- **H1**: `3.5rem` (56px) - Tight tracking, line-height 1.1
- **H2**: `2.5rem` (40px)
- **H3**: `1.75rem` (28px)
- **Body**: `1rem` (16px) or `1.125rem` (18px)
- **Small**: `0.875rem` (14px)

## 4. Layout & Spacing

### Grid & Containers
- **Max Width**: `1280px` or `1440px` (Centered)
- **Grid System**: 12-column grid preferred for marketing pages.

### Spacing Scale (8pt Grid)
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px
- **Section Padding**: 80px - 120px

## 5. UI Components

### Buttons
- **Primary**:
  - Background: `#FFE600`
  - Text: `#000000` (Black)
  - Weight: 600
  - Padding: `12px 24px`
  - Radius: `4px` (Sharp/Small) or `8px`
  - Hover: Brighten or slight lift.

### Cards
- **Dark Mode**:
  - Background: `#171717`
  - Border: `1px solid #333333`
  - Radius: `12px` or `16px`
  - Padding: `24px` or `32px`

### Interaction
- **Hover**: Snappy feedback, slight lift (`translateY(-2px)`), or border lighting up.
- **Focus**: High contrast yellow outline.

## 6. CSS Variables Reference
```css
:root {
  --color-primary: #FFE600;
  --bg-page: #0A0A0A;
  --bg-card: #171717;
  --text-main: #FFFFFF;
  --text-muted: #A1A1AA;
  --border-subtle: #333333;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```
