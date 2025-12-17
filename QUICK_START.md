# Harles & Associates Website - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

### Components
All React components are located in `src/components/`:

- **Header.tsx**: Navigation bar with dropdown menus and mobile menu
- **Hero.tsx**: Hero section with headline and CTAs
- **Services.tsx**: 6-service grid with cards
- **HowItWorks.tsx**: 4-step process visualization
- **Testimonials.tsx**: Carousel with navigation controls
- **FAQ.tsx**: Accordion-style FAQ section
- **CTA.tsx**: Call-to-action section
- **Footer.tsx**: Multi-column footer with links

### Styling
- **globals.css**: Global styles, design system, and utility classes
- **tailwind.config.js**: Tailwind CSS configuration with custom colors and fonts

## Customization Guide

### Updating Company Information

#### Hero Section
Edit `src/components/Hero.tsx`:
```tsx
<h1>Your new headline</h1>
<p>Your new description</p>
```

#### Services
Edit `src/components/Services.tsx` - modify the `services` array:
```tsx
const services = [
  {
    title: 'Service Name',
    description: 'Service description',
    icon: '🎯',
  },
  // Add more services
];
```

#### Testimonials
Edit `src/components/Testimonials.tsx` - modify the `testimonials` array:
```tsx
const testimonials = [
  {
    quote: 'Client testimonial text',
    author: 'Client Name',
    title: 'Client Title',
    company: 'Company Name',
  },
  // Add more testimonials
];
```

#### FAQ
Edit `src/components/FAQ.tsx` - modify the `faqs` array:
```tsx
const faqs = [
  {
    question: 'Your question?',
    answer: 'Your answer',
  },
  // Add more FAQs
];
```

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:
```js
colors: {
  'brand-primary': '#1a1a1a',      // Main color
  'brand-secondary': '#2d5016',    // Secondary
  'brand-accent': '#4a7c2c',       // Accent
  'brand-light': '#f5f5f5',        // Light background
  'brand-border': '#e0e0e0',       // Borders
}
```

Also update `src/app/globals.css` CSS variables:
```css
:root {
  --brand-primary: #1a1a1a;
  --brand-secondary: #2d5016;
  --brand-accent: #4a7c2c;
  --brand-light: #f5f5f5;
  --brand-border: #e0e0e0;
}
```

### Updating Navigation Links

Edit `src/components/Header.tsx` to update menu items and links:
```tsx
<Link href="/your-page">Menu Item</Link>
```

### Updating Footer Links

Edit `src/components/Footer.tsx` to update footer sections and links.

## Adding New Pages

1. Create a new file in `src/app/` directory (e.g., `about/page.tsx`)
2. Add the route structure:
   ```tsx
   export default function About() {
     return (
       <div>
         <Header />
         {/* Your content */}
         <Footer />
       </div>
     );
   }
   ```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically deploys on push

### Other Platforms
```bash
npm run build
# Deploy the .next folder
```

## Performance Tips

1. **Images**: Use Next.js Image component for optimization
2. **Fonts**: Already optimized with Google Fonts
3. **CSS**: Tailwind CSS is tree-shaken in production
4. **JavaScript**: Minimal client-side JS, mostly static content

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check Tailwind CSS configuration

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## License
All rights reserved © 2025 Harles & Associates

