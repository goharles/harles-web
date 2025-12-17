# Harles & Associates Website - Architecture

## Project Structure

```
harles_web/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout wrapper
│   │   ├── page.tsx                # Home page (main entry point)
│   │   ├── globals.css             # Global styles & design system
│   │   └── favicon.ico             # Site favicon
│   │
│   └── components/                 # Reusable React components
│       ├── Header.tsx              # Navigation & header
│       ├── Hero.tsx                # Hero section
│       ├── Services.tsx            # Services grid
│       ├── HowItWorks.tsx          # Process steps
│       ├── Testimonials.tsx        # Testimonial carousel
│       ├── FAQ.tsx                 # FAQ accordion
│       ├── CTA.tsx                 # Call-to-action section
│       └── Footer.tsx              # Footer with links
│
├── public/                         # Static assets
│   ├── favicon.ico
│   ├── next.svg
│   ├── vercel.svg
│   └── ...
│
├── Configuration Files
│   ├── next.config.ts              # Next.js configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── postcss.config.mjs          # PostCSS configuration
│   ├── eslint.config.mjs           # ESLint configuration
│   └── package.json                # Dependencies & scripts
│
└── Documentation
    ├── DESIGN_DOCUMENTATION.md     # Design specifications
    ├── QUICK_START.md              # Setup & customization guide
    ├── IMPLEMENTATION_SUMMARY.md   # Project completion summary
    └── ARCHITECTURE.md             # This file
```

## Component Hierarchy

```
RootLayout (layout.tsx)
└── Home (page.tsx)
    ├── Header
    │   ├── Logo/Brand
    │   ├── Desktop Navigation
    │   │   ├── Platform Dropdown
    │   │   └── Solutions Dropdown
    │   ├── CTA Buttons
    │   └── Mobile Menu Toggle
    │
    ├── Hero
    │   ├── Headline
    │   ├── Description
    │   └── CTA Buttons
    │
    ├── Services
    │   ├── Section Title
    │   └── Service Cards (6x)
    │       ├── Icon
    │       ├── Title
    │       ├── Description
    │       └── Learn More Link
    │
    ├── HowItWorks
    │   ├── Section Title
    │   └── Process Steps (4x)
    │       ├── Step Number
    │       ├── Step Title
    │       ├── Step Description
    │       └── Connector Line
    │
    ├── Testimonials
    │   ├── Section Title
    │   ├── Testimonial Card
    │   │   ├── Star Rating
    │   │   ├── Quote
    │   │   ├── Author Name
    │   │   └── Author Title
    │   └── Navigation Controls
    │       ├── Previous Button
    │       ├── Dot Indicators
    │       └── Next Button
    │
    ├── FAQ
    │   ├── Section Title
    │   └── FAQ Items (6x)
    │       ├── Question Button
    │       ├── Chevron Icon
    │       └── Answer (Expandable)
    │
    ├── CTA
    │   ├── Headline
    │   ├── Description
    │   └── Action Buttons
    │
    └── Footer
        ├── Company Info
        │   ├── Logo
        │   ├── Description
        │   └── Social Links
        ├── Link Sections (4x)
        │   ├── Platform
        │   ├── Solutions
        │   ├── Resources
        │   └── Company
        └── Bottom Bar
            ├── Copyright
            └── Policy Links
```

## Data Flow

### Static Content
All content is hardcoded in components (no database):
- Services array in Services.tsx
- Testimonials array in Testimonials.tsx
- FAQ array in FAQ.tsx
- Navigation links in Header.tsx and Footer.tsx

### State Management
Minimal state using React hooks:
- `Header.tsx`: Mobile menu toggle state
- `Testimonials.tsx`: Current testimonial index
- `FAQ.tsx`: Expanded FAQ item index

### Styling Flow
```
globals.css (Design System)
    ↓
Tailwind CSS Classes
    ↓
Component JSX
    ↓
Rendered HTML
```

## Technology Stack Details

### Frontend Framework
- **Next.js 16**: React framework with built-in optimization
- **React 19**: UI library with hooks
- **TypeScript**: Type-safe JavaScript

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Custom CSS**: Global styles in globals.css

### Development Tools
- **ESLint**: Code quality
- **Node.js**: Runtime environment
- **npm**: Package manager

## Key Design Patterns

### Component Pattern
Each component is a self-contained, reusable unit:
```tsx
export default function ComponentName() {
  return (
    <section className="...">
      {/* Component content */}
    </section>
  );
}
```

### Responsive Design Pattern
Mobile-first approach using Tailwind breakpoints:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### State Management Pattern
Minimal state with React hooks:
```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Styling Pattern
Combination of Tailwind classes and custom CSS:
```tsx
<button className="btn btn-primary">Click me</button>
```

## Performance Optimizations

### Code Splitting
- Components are automatically code-split by Next.js
- Only necessary code is loaded per page

### CSS Optimization
- Tailwind CSS is tree-shaken in production
- Unused styles are removed
- CSS is minified and compressed

### Image Optimization
- Static images in public folder
- Ready for Next.js Image component optimization

### JavaScript Optimization
- Minimal client-side JavaScript
- Most content is static HTML
- Smooth animations use CSS, not JavaScript

## Deployment Architecture

### Build Process
```
npm run build
    ↓
Next.js Compilation
    ↓
TypeScript Type Checking
    ↓
CSS Processing
    ↓
Static HTML Generation
    ↓
.next/ folder (production build)
```

### Runtime Environment
- Node.js server
- Can be deployed to:
  - Vercel (recommended)
  - Netlify
  - AWS
  - Google Cloud
  - Any Node.js hosting

## Scalability Considerations

### Adding New Pages
1. Create new folder in `src/app/`
2. Add `page.tsx` file
3. Import Header and Footer
4. Add content

### Adding New Components
1. Create new file in `src/components/`
2. Export default function
3. Import in page.tsx
4. Add to component hierarchy

### Updating Content
1. Modify data arrays in components
2. Update text and descriptions
3. Change colors in tailwind.config.js
4. Rebuild and deploy

## Security Considerations

### Current Implementation
- No user input (static content)
- No database connections
- No authentication required
- No sensitive data handling

### Future Enhancements
- Add form validation for contact forms
- Implement CSRF protection
- Add rate limiting for APIs
- Use environment variables for secrets

## Accessibility Features

### Implemented
- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Alt text ready for images
- Keyboard navigation support
- Color contrast compliance
- Mobile-friendly touch targets

### Ready for Enhancement
- ARIA labels for complex components
- Screen reader testing
- Keyboard-only navigation testing
- Color blindness testing

## Browser Compatibility

### Supported Browsers
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### CSS Features Used
- CSS Grid
- Flexbox
- CSS Transitions
- CSS Transforms
- CSS Custom Properties

## Maintenance & Updates

### Regular Tasks
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Run linter: `npm run lint`
- Build and test: `npm run build`

### Content Updates
- Edit component files directly
- No database to manage
- Simple version control with Git

### Performance Monitoring
- Monitor Core Web Vitals
- Check page load times
- Monitor user interactions
- Track conversion metrics

