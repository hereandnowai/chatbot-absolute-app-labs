# Absolute App Labs - Design Style Guide

> This style guide documents the design tokens, colors, typography, spacing, and UI patterns used in the Absolute App Labs website. Use this guide to ensure visual consistency when building the chat widget.

## Color Palette

### Primary Colors
```css
--header-nav-color: #464569         /* Navigation text */
--header-hover-nav-color: #274DA1   /* Primary brand blue - hover states */
--header-nav-active-color: #274DA1  /* Active navigation items */
--title-border-color: #74D0F1       /* Accent light blue */
```

### Brand Colors
- **Primary Blue**: `#274DA1` - Main brand color, buttons, links, active states
- **Light Blue Accent**: `#74D0F1` - Highlights, underlines, accents
- **Dark Blue**: `#0E1C3B` - Deep backgrounds, cards
- **Gradient**: `linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%)` - Buttons, CTAs

### Text Colors
```css
--title-color: #14133D              /* Main headings */
--title-primary-color: #14133D      /* Primary titles */
--subtitle-primary-color: #3D3C45   /* Subtitles */
--primary-text-color: #3D3C45       /* Body text */
--secondary-text-color: #000000     /* Secondary body text */
--default-text-color: #FFFFFF       /* Light text on dark backgrounds */
```

### Background Colors
```css
--default-bgcolor: #FFFFFF          /* Default page background */
--sidebar-bgcolor: #FFFFFF          /* Sidebar background */
--footer-background: #000000        /* Footer background */
```

### UI Element Colors
```css
--default-button-color: #FFFFFF     /* Button text */
--default-button-bgcolor: linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%)
--hover-button-color: #14133D       /* Button text on hover */
--hover-button-bgcolor: #FFFFFF     /* Button background on hover */
--hover-button-border-color: #14133D
```

### Utility Colors
- Border Gray: `#E6E6E6`, `#696969`, `#484848`
- Shadow: `rgba(0, 0, 0, 0.12)`, `#0000001A`

## Typography

### Font Families
```css
--site-primary-font: "Manrope", sans-serif;     /* Body text, UI elements */
--site-secondary-font: "Urbanist", sans-serif;  /* Headings, titles */
```

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
```

### Heading Sizes
```css
h1 {
    font-size: 60px;
    line-height: 70px;
    font-family: var(--site-secondary-font);
    font-weight: 900;
    color: #14133D;
}

h2 {
    font-size: 40px;
    line-height: 51px;
    font-family: var(--site-secondary-font);
    color: #14133D;
}

h3 {
    font-size: 32px;
    line-height: 42px;
    font-family: var(--site-secondary-font);
}

h4 {
    font-size: 24px;
    line-height: 32px;
    font-family: var(--site-secondary-font);
}

h5 {
    font-size: 20px;
    line-height: 28px;
    font-family: var(--site-secondary-font);
}

h6 {
    font-size: 18px;
    line-height: 24px;
    font-family: var(--site-secondary-font);
}
```

### Body Text
```css
body {
    font-family: var(--site-primary-font);
    font-size: 16px;
    line-height: 26px;
    color: #3D3C45;
}
```

## Spacing & Layout

### Standard Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

### Common Padding Values
- Card padding: `20px` - `35px`
- Button padding: `10px 20px` - `16px 32px`
- Section padding: `50px 0` - `80px 0`
- Container padding: `15px` - `30px`

## Border Radius

### Standard Border Radius
```css
--border-radius-sm: 5px;     /* Small elements */
--border-radius-md: 7px;     /* Buttons, inputs */
--border-radius-lg: 11px;    /* Cards */
--border-radius-xl: 20px;    /* Large cards */
--border-radius-round: 50%;  /* Circular elements */
```

## Shadows

### Box Shadows
```css
/* Sticky header shadow */
--shadow-sticky: 0 12px 10px -10px rgba(0, 0, 0, 0.12);

/* Default card shadow */
--default-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.1);

/* Hover shadow */
box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.25);

/* Subtle shadow */
box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
```

## Buttons

### Primary Button
```css
.btn-primary {
    background: linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%);
    color: #FFFFFF;
    border: 1px solid transparent;
    border-radius: 7px;
    padding: 16px 32px;
    font-size: 17px;
    font-weight: 600;
    font-family: var(--site-primary-font);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: #FFFFFF;
    color: #14133D;
    border-color: #14133D;
}
```

### Secondary Button
```css
.btn-secondary {
    background: #FFFFFF;
    color: #274DA1;
    border: 2px solid #274DA1;
    border-radius: 7px;
    padding: 15px 30px;
    font-size: 24px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #274DA1;
    color: #FFFFFF;
    border-color: #74D0F1;
}
```

## Forms

### Input Fields
```css
.form-control {
    border: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    font-family: var(--site-primary-font);
    font-size: 16px;
    padding: 8px 15px;
    min-height: 46px;
    transition: all 0.3s ease;
}

.form-control:focus {
    border-color: #274DA1;
    box-shadow: none;
    outline: none;
}
```

## Chat Widget Specific Styles

### Floating Button
```css
.chat-widget-button {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%);
    box-shadow: 0 4px 12px rgba(39, 77, 161, 0.4);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 9999;
}

.chat-widget-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(39, 77, 161, 0.6);
}
```

### Chat Window
```css
.chat-window {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 380px;
    max-height: 600px;
    border-radius: 11px;
    background: #FFFFFF;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 9998;
}
```

### Chat Header
```css
.chat-header {
    background: linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%);
    color: #FFFFFF;
    padding: 20px;
    font-family: var(--site-secondary-font);
    font-size: 18px;
    font-weight: 600;
}
```

### Message Bubbles
```css
/* User message */
.message-user {
    background: linear-gradient(89.39deg, #274DA1 0.53%, #74D0F1 117.25%);
    color: #FFFFFF;
    border-radius: 11px 11px 0 11px;
    padding: 12px 16px;
    margin: 8px 0;
    align-self: flex-end;
    max-width: 75%;
}

/* Bot message */
.message-bot {
    background: #F5F5F5;
    color: #3D3C45;
    border-radius: 11px 11px 11px 0;
    padding: 12px 16px;
    margin: 8px 0;
    align-self: flex-start;
    max-width: 75%;
}
```

## Animations & Transitions

### Standard Transitions
```css
transition: all 0.3s ease;
transition: all 0.4s ease;
```

### Hover Effects
- Scale: `transform: scale(1.05)` - `scale(1.1)`
- Shadow intensification
- Color transitions

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 479px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Small Desktop */
@media (max-width: 999px) { ... }

/* Desktop */
@media (max-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1200px) { ... }
```

## Icons & Graphics

### Icon Style
- Use SVG icons where possible
- Icon color should match text color or use brand colors
- Icon size: 20px - 24px for UI elements
- Hover: Apply primary blue color `#274DA1`

## Accessibility

### Focus States
```css
:focus {
    outline: 2px solid #274DA1;
    outline-offset: 2px;
}
```

### ARIA Attributes
- Always use `aria-label` for icon-only buttons
- Use `aria-expanded` for collapsible elements
- Use `role="dialog"` for chat window
- Ensure keyboard navigation support

## Best Practices

1. **Consistency**: Always use CSS variables for colors
2. **Responsive**: Mobile-first approach
3. **Performance**: Use `transform` and `opacity` for animations
4. **Accessibility**: Maintain WCAG 2.1 AA standards
5. **Typography**: Use relative units (rem, em) where appropriate
6. **Spacing**: Follow the 8px grid system

---

**Last Updated**: November 2025
**Version**: 1.0.0
