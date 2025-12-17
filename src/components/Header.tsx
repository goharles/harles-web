'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu

    // If not on homepage, navigate to homepage with hash
    if (pathname !== '/') {
      router.push(`/#${targetId}`);
      return;
    }

    // If on homepage, smooth scroll to section
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <Image
            src="/logo.png"
            alt="Harles & Associates Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span>Harles & Associates</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
          >
            Services
          </a>

          <a
            href="#our-strategy"
            onClick={(e) => handleSmoothScroll(e, 'our-strategy')}
            className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
          >
            Our Strategy
          </a>

          <a
            href="#footer"
            onClick={(e) => handleSmoothScroll(e, 'footer')}
            className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
          >
            Contact Us
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link href="/book-a-call" className="btn btn-primary">
            Book a Call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav id="mobile-nav" className="container py-4 flex flex-col gap-4">
            <a
              href="#services"
              onClick={(e) => handleSmoothScroll(e, 'services')}
              className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
            >
              Services
            </a>
            <a
              href="#our-strategy"
              onClick={(e) => handleSmoothScroll(e, 'our-strategy')}
              className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
            >
              Our Strategy
            </a>
            <a
              href="#footer"
              onClick={(e) => handleSmoothScroll(e, 'footer')}
              className="text-base font-medium text-foreground/90 hover:text-foreground transition-colors cursor-pointer"
            >
              Contact Us
            </a>
            <Link href="/book-a-call" className="btn btn-primary w-full">
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
