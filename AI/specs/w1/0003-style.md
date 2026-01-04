# MotherDuck Design Style Analysis & Specification

## 1. Design Philosophy
The MotherDuck website embodies a **modern, developer-centric, and bold** aesthetic. It leverages the playful yet technical "Duck" branding (associated with DuckDB) by combining high-contrast colors (yellow and black) with clean, readable typography. The design emphasizes clarity, performance, and ease of use, typical of modern data infrastructure tools.

## 2. Core Design Elements

### 2.1 Color Palette
The color scheme is defined by a strong "Duck Yellow" accent against a severe, high-contrast dark or light background.

*   **Primary Brand Color (Duck Yellow):**
    *   Hex: `#FFE600` (Vibrant Yellow) or `#FFD700` (Golden)
    *   Usage: CTAs, highlights, logos, active states.
*   **Backgrounds:**
    *   **Dark Mode (Primary):** `#0A0A0A` (Near Black)
    *   **Surface/Card (Dark):** `#171717` or `#262626`
    *   **Light Mode (Secondary/Docs):** `#FFFFFF`
    *   **Surface/Card (Light):** `#F9FAFB` (Gray-50)
*   **Text:**
    *   **Primary Text (Dark Mode):** `#FFFFFF`
    *   **Secondary Text (Dark Mode):** `#A1A1AA` (Gray-400)
    *   **Primary Text (Light Mode):** `#111827` (Gray-900)
*   **Borders:**
    *   Subtle borders: `#333333` (in dark mode)

### 2.2 Typography
Clean sans-serifs for UI and legible monospace for code are essential.

*   **Font Family (Headings & Body):** `Inter`, `San Francisco`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`, `sans-serif`.
*   **Font Family (Code):** `JetBrains Mono`, `Fira Code`, `Menlo`, `Monaco`, `monospace`.
*   **Font Weights:**
    *   Regular: 400
    *   Medium: 500
    *   Bold: 600 or 700 (Headings)
*   **Sizes (Scale):**
    *   H1: `3.5rem` (56px) - Tight tracking
    *   H2: `2.5rem` (40px)
    *   H3: `1.75rem` (28px)
    *   Body: `1rem` (16px) or `1.125rem` (18px) for readability.
    *   Small: `0.875rem` (14px)

### 2.3 Layout & Spacing
*   **Container Width:** Max-width `1280px` or `1440px` for main content; centered.
*   **Grid:** 12-column grid for marketing pages.
*   **Spacing (8pt Grid System):**
    *   xs: `4px`
    *   sm: `8px`
    *   md: `16px`
    *   lg: `24px`
    *   xl: `32px`
    *   2xl: `48px`
    *   3xl: `64px`
    *   Section Padding: `80px` to `120px` vertical.

### 2.4 Visual Elements
*   **Border Radius:**
    *   Buttons: `4px` (Small/Sharp) or `9999px` (Pill) - MotherDuck tends towards slightly rounded squares (`6px-8px`) or full pills for specific actions.
    *   Cards: `12px` or `16px`.
*   **Shadows:**
    *   Subtle drop shadows for cards in light mode.
    *   Glow effects (Yellow) for dark mode active elements.
*   **Icons:**
    *   Simple, stroke-based icons (approx 1.5px stroke width).

## 3. Implementation Guidelines (CSS / Tailwind)

### 3.1 CSS Variables (Root)
```css
:root {
  /* Brand */
  --color-primary: #FFE600;
  --color-primary-hover: #E6CF00;
  
  /* Backgrounds */
  --bg-page: #0A0A0A;
  --bg-card: #171717;
  --bg-surface: #262626;
  
  /* Text */
  --text-main: #FFFFFF;
  --text-muted: #A3A3A3;
  
  /* Borders */
  --border-subtle: #333333;
  
  /* Spacing */
  --space-unit: 4px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
}
```

### 3.2 UI Component Styles

#### Button (Primary)
*   Background: `var(--color-primary)`
*   Text Color: `#000000` (Black for contrast)
*   Font Weight: `600`
*   Padding: `12px 24px`
*   Border Radius: `var(--radius-md)`
*   Hover: Brighten or slight lift.

#### Card
*   Background: `var(--bg-card)`
*   Border: `1px solid var(--border-subtle)`
*   Padding: `24px` or `32px`
*   Border Radius: `var(--radius-lg)`

#### Typography
*   **Headings:** `font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;`
*   **Body:** `font-weight: 400; line-height: 1.6; color: var(--text-muted);`

## 4. UX/Interaction Patterns
*   **Hover Effects:** Elements should have immediate, snappy feedback. Cards may lift (`transform: translateY(-2px)`) or borders may light up.
*   **Focus States:** High contrast yellow outline (`2px solid #FFE600`) for accessibility.
*   **Navigation:** Sticky top bar with blur effect (`backdrop-filter: blur(10px)`).
