# Harles & Associates Website - Design Documentation

## Overview
The Harles & Associates website has been redesigned to match the modern, professional design patterns of Fair Supply while showcasing the company's sustainability and ESG solutions.

## Design Principles Applied from Fair Supply

### 1. **Layout & Navigation**
- **Sticky Header**: Fixed navigation bar with company logo and menu items
- **Dropdown Menus**: Hover-activated dropdowns for Platform and Solutions sections
- **Responsive Design**: Mobile-first approach with hamburger menu for smaller screens
- **Clean Typography**: Open Sans font family for consistency and readability

### 2. **Visual Design Elements**

#### Color Scheme
- **Primary**: #1a1a1a (Dark charcoal - main text and backgrounds)
- **Secondary**: #2d5016 (Forest green - accent color)
- **Accent**: #4a7c2c (Lighter green - highlights and CTAs)
- **Light**: #f5f5f5 (Off-white - section backgrounds)
- **Border**: #e0e0e0 (Light gray - dividers)

#### Typography
- **Font Family**: Open Sans (imported from Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Heading Sizes**: Responsive scaling from h1 (3rem) to h6
- **Line Heights**: Optimized for readability (1.2 for headings, 1.6 for body)

#### Spacing & Layout
- **Container**: Max-width 1200px with responsive padding
- **Section Padding**: 4rem (desktop), 2rem (mobile)
- **Grid System**: Responsive grid with auto-fit columns
- **Gap Spacing**: 2rem between grid items

### 3. **Interactive Elements**

#### Buttons
- **Primary Button**: Dark background with white text, hover effect with color transition
- **Secondary Button**: Transparent with border, inverts on hover
- **Animations**: Smooth transitions (0.5s cubic-bezier) with transform effects

#### Cards
- **Hover Effects**: Subtle lift (translateY -4px) with shadow enhancement
- **Border Transitions**: Border color changes on hover
- **Smooth Animations**: All transitions use consistent timing

#### Accordion (FAQ)
- **Expandable Sections**: Click to reveal/hide content
- **Icon Rotation**: Chevron icon rotates 180° when expanded
- **Smooth Height Animation**: Content slides in smoothly

### 4. **Page Sections**

#### Hero Section
- **Background**: Gradient from light gray to white
- **Content**: Large headline, descriptive text, dual CTA buttons
- **Layout**: Max-width container for optimal readability

#### Services Section
- **Grid Layout**: 3-column responsive grid (1 column mobile, 2 tablet, 3 desktop)
- **Card Design**: White cards with borders, emoji icons, descriptions
- **Hover State**: Cards lift and show enhanced shadow

#### How It Works Section
- **Step-by-Step**: 4-step process with numbered cards
- **Visual Connector**: Horizontal line connecting steps (desktop only)
- **Background**: Light gray section for visual separation

#### Testimonials Section
- **Carousel**: Manual navigation with previous/next buttons
- **Indicators**: Dot indicators showing current slide
- **Star Rating**: 5-star display for each testimonial
- **Responsive**: Full-width on mobile, centered on desktop

#### FAQ Section
- **Accordion Style**: Expandable questions with smooth animations
- **Icon Feedback**: Chevron icon indicates expand/collapse state
- **Alternating Backgrounds**: White cards on light gray background

#### CTA Section
- **Dark Background**: Brand primary color for contrast
- **Dual Buttons**: Primary and secondary button options
- **Centered Content**: Maximum impact for conversion

#### Footer
- **Multi-Column Layout**: 5-column grid (responsive to 1 column on mobile)
- **Link Organization**: Platform, Solutions, Resources, Company sections
- **Social Links**: LinkedIn and Twitter icons
- **Bottom Bar**: Copyright and policy links

## Technical Implementation

### Technology Stack
- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS v4 with custom configuration
- **Components**: React functional components with hooks
- **Font**: Google Fonts (Open Sans)

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page with all sections
│   └── globals.css         # Global styles and design system
├── components/
│   ├── Header.tsx          # Navigation and header
│   ├── Hero.tsx            # Hero section
│   ├── Services.tsx        # Services grid
│   ├── HowItWorks.tsx      # Process steps
│   ├── Testimonials.tsx    # Testimonial carousel
│   ├── FAQ.tsx             # FAQ accordion
│   ├── CTA.tsx             # Call-to-action section
│   └── Footer.tsx          # Footer with links
```

### Key Features
1. **Responsive Design**: Mobile-first approach with breakpoints at 768px
2. **Smooth Animations**: CSS transitions and keyframe animations
3. **Accessibility**: Semantic HTML, proper heading hierarchy, ARIA labels
4. **Performance**: Optimized images, lazy loading, minimal JavaScript
5. **SEO**: Proper metadata, semantic structure, Open Graph ready

## Responsive Breakpoints
- **Mobile**: < 768px (single column layouts)
- **Tablet**: 768px - 1024px (2-column layouts)
- **Desktop**: > 1024px (3+ column layouts)

## Color Usage Guidelines
- **Primary (#1a1a1a)**: Main text, headers, primary backgrounds
- **Secondary (#2d5016)**: Hover states, secondary accents
- **Accent (#4a7c2c)**: CTAs, highlights, interactive elements
- **Light (#f5f5f5)**: Section backgrounds, subtle contrast
- **Border (#e0e0e0)**: Dividers, card borders

## Animation Specifications
- **Transition Duration**: 0.5s cubic-bezier(0.4, 1.8, 0.6, 1)
- **Hover Effects**: Color changes, transforms, shadow enhancements
- **Scroll Behavior**: Smooth scrolling enabled
- **Fade-in**: 0.5s ease-in-out
- **Slide-up**: 0.5s ease-out with 20px vertical movement

## Future Enhancements
1. Add actual case studies and testimonials
2. Implement contact form with validation
3. Add blog section with articles
4. Create service detail pages
5. Implement analytics tracking
6. Add dark mode support
7. Optimize images with Next.js Image component
8. Add video content sections

